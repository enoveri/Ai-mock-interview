"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { vapi } from "@/lib/vapi.sdk";
import { useAuth } from "@/providers/auth-provider";
import { createInterviewAssistant } from "@/constants";

interface AgentProps {
  interviewId: string;
  interviewData?: any;
  isSetupMode: boolean;
}

type CallStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

interface TranscriptMessage {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

export function Agent({ interviewId, interviewData, isSetupMode }: AgentProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isSpeaking, setIsSpeaking] = useState<"agent" | "user" | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [callId, setCallId] = useState<string | null>(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [generatedInterviewId, setGeneratedInterviewId] = useState<string | null>(null);
  const isCallActive = useRef(false);

  // Set up Vapi event listeners
  useEffect(() => {
    const setupVapiListeners = () => {
      // Call status events
      vapi.on("call-start", () => {
        setCallStatus("connected");
        isCallActive.current = true;
        console.log("Call started");
      });

      vapi.on("call-end", () => {
        setCallStatus("disconnected");
        isCallActive.current = false;
        setIsSpeaking(null);
        
        // If it was a setup call, mark as complete
        if (isSetupMode) {
          setSetupComplete(true);
        }
        
        console.log("Call ended");
      });

      vapi.on("error", (error) => {
        console.error("Vapi error:", error);
        setCallStatus("error");
        isCallActive.current = false;
      });

      // Speech events
      vapi.on("speech-start", () => {
        setIsSpeaking("agent");
      });

      vapi.on("speech-end", () => {
        setIsSpeaking(null);
      });

      // Transcript events
      vapi.on("message", (message) => {
        if (message.type === "transcript") {
          const transcriptMsg: TranscriptMessage = {
            role: message.role === "user" ? "user" : "assistant",
            message: message.transcript,
            timestamp: new Date().toISOString(),
          };

          if (message.transcriptType === "final") {
            setTranscript(prev => [...prev, transcriptMsg]);
            setCurrentMessage("");
          } else {
            setCurrentMessage(message.transcript);
          }
        }
        
        // Handle function call results to capture interview ID
        if (message.type === "function-call-result" && isSetupMode) {
          try {
            const result = message.functionCallResult?.result;
            if (result && typeof result === "object" && "interviewId" in result) {
              setGeneratedInterviewId(result.interviewId as string);
            }
          } catch (error) {
            console.error("Error parsing function call result:", error);
          }
        }
      });

      // Volume events for user speaking indication
      vapi.on("volume-level", (volume) => {
        if (volume > 0.1 && isCallActive.current) {
          setIsSpeaking("user");
        } else if (volume <= 0.1) {
          setIsSpeaking(null);
        }
      });
    };

    setupVapiListeners();

    // Cleanup listeners on unmount
    return () => {
      vapi.removeAllListeners();
    };
  }, [isSetupMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Spacebar to start/stop call
      if (event.code === "Space" && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        const activeElement = document.activeElement;
        // Only trigger if not focused on input/textarea
        if (activeElement?.tagName !== "INPUT" && activeElement?.tagName !== "TEXTAREA") {
          event.preventDefault();
          handleCallAction();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [callStatus]);

  const handleCallAction = async () => {
    try {
      switch (callStatus) {
        case "idle":
        case "disconnected":
        case "error":
          setCallStatus("connecting");
          
          if (isSetupMode) {
            // Use workflow for interview setup
            const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
            if (!workflowId) {
              throw new Error("Vapi workflow ID not configured. Please check your environment variables.");
            }

            const call = await vapi.start(workflowId, {
              variableValues: {
                userid: user?.uid || "anonymous",
                interviewId: interviewId,
              }
            });
            
            setCallId(call?.id || null);
          } else {
            // Use assistant for actual interview
            if (!interviewData) {
              throw new Error("Interview data not available");
            }

            const assistantConfig = createInterviewAssistant(interviewData);
            const call = await vapi.start(assistantConfig as any);
            
            setCallId(call?.id || null);
          }
          break;
          
        case "connected":
          await vapi.stop();
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error("Call action error:", error);
      setCallStatus("error");
      
      // Show user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes("workflow ID not configured")) {
          alert("Vapi configuration missing. Please contact support.");
        } else if (error.message.includes("Interview data not available")) {
          alert("Interview data could not be loaded. Please try refreshing the page.");
        } else {
          alert("Failed to connect. Please check your internet connection and try again.");
        }
      }
    }
  };

  const getButtonText = () => {
    switch (callStatus) {
      case "idle":
        return isSetupMode ? "Start Interview Setup" : "Start Interview";
      case "connecting":
        return "Connecting...";
      case "connected":
        return "End Call";
      case "disconnected":
        return "Call Again";
      case "error":
        return "Try Again";
      default:
        return isSetupMode ? "Start Interview Setup" : "Start Interview";
    }
  };

  const getButtonClass = () => {
    switch (callStatus) {
      case "idle":
      case "disconnected":
        return "btn-call";
      case "connecting":
        return "btn-call opacity-50 cursor-not-allowed";
      case "connected":
        return "btn-disconnect";
      case "error":
        return "btn-call bg-destructive-100 hover:bg-destructive-200";
      default:
        return "btn-call";
    }
  };

  const getStatusMessage = () => {
    switch (callStatus) {
      case "idle":
        return isSetupMode 
          ? "Ready to start your interview setup" 
          : "Ready to start your interview";
      case "connecting":
        return isSetupMode 
          ? "Connecting to your AI interviewer setup assistant..." 
          : "Connecting to your AI interviewer...";
      case "connected":
        return isSetupMode 
          ? "Connected - Speak with your setup assistant" 
          : "Connected - Your interview is in progress";
      case "disconnected":
        if (isSetupMode && setupComplete) {
          return "Setup complete! Your interview has been configured.";
        }
        return isSetupMode 
          ? "Setup complete! Your interview has been configured." 
          : "Interview completed. Great job!";
      case "error":
        return "Connection error. Please try again.";
      default:
        return "";
    }
  };

  const handleStartInterview = () => {
    if (generatedInterviewId) {
      router.push(`/interview/${generatedInterviewId}`);
    }
  };

  return (
    <div className="w-full">
      {/* Status Message */}
      <div className="text-center mb-6">
        <p className="text-light-100 text-sm">{getStatusMessage()}</p>
        {callId && (
          <p className="text-light-400 text-xs mt-1">Call ID: {callId}</p>
        )}
      </div>

      {/* Call View */}
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            {isSpeaking === "agent" && <div className="animate-speak" />}
          </div>
          <h3>{isSetupMode ? "AI Interview Setup" : "AI Interviewer"}</h3>
          <p className="text-sm text-light-400">
            {callStatus === "connected" ? "Speaking..." : "Ready to help"}
          </p>
        </div>

        {/* User Card - Hidden on mobile */}
        <div className="card-border">
          <div className="card-content">
            <div className="avatar">
              <Image
                src="/user-avatar.png"
                alt="You"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
              {isSpeaking === "user" && <div className="animate-speak" />}
            </div>
            <h3>You</h3>
            <p className="text-sm text-light-400">
              {isSpeaking === "user" ? "Speaking..." : "Listening"}
            </p>
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      {(callStatus === "connected" || transcript.length > 0) && (
        <div className="transcript-border mt-8">
          <div className="transcript max-h-64 overflow-y-auto">
            <h4 className="text-sm font-semibold mb-3 text-light-100">
              Conversation:
            </h4>
            <div className="space-y-2">
              {transcript.map((msg, index) => (
                <div key={index} className="text-sm">
                  <span className={`font-medium ${
                    msg.role === "user" ? "text-primary-200" : "text-light-100"
                  }`}>
                    {msg.role === "user" ? "You" : "AI"}: 
                  </span>
                  <span className="ml-2 text-light-400">{msg.message}</span>
                </div>
              ))}
              {currentMessage && (
                <div className="text-sm opacity-60">
                  <span className="font-medium text-light-100">AI: </span>
                  <span className="ml-2 text-light-400">{currentMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleCallAction}
          className={getButtonClass()}
          disabled={callStatus === "connecting"}
        >
          {getButtonText()}
        </Button>
      </div>

      {/* Start Interview Button - Only shown after setup completion */}
      {isSetupMode && setupComplete && generatedInterviewId && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleStartInterview}
            className="btn-primary"
          >
            Start Your Interview
          </Button>
        </div>
      )}

      {/* Instructions */}
      {callStatus === "idle" && (
        <div className="mt-6 text-center text-sm text-light-400 space-y-2">
          {isSetupMode ? (
            <>
              <p>Click the button above to start setting up your AI interview.</p>
              <p>The AI will ask you about the role, tech stack, and interview preferences.</p>
            </>
          ) : (
            <>
              <p>Click the button above to start your interview with the AI.</p>
              <p>
                {interviewData && `You'll be asked ${interviewData.questions.length} questions about ${interviewData.role}.`}
              </p>
            </>
          )}
          <div className="mt-3 p-2 bg-dark-200 rounded text-xs text-light-400">
            💡 Tip: Press <kbd className="px-1 py-0.5 bg-primary-200/20 rounded text-primary-200">Space</kbd> to start/stop calls
          </div>
        </div>
      )}

      {/* Connection Tips */}
      {callStatus === "connecting" && (
        <div className="mt-6 text-center text-sm text-light-400 space-y-2">
          <p>🎤 Make sure your microphone is enabled</p>
          <p>🔊 Check your speakers or headphones</p>
          <p>If connection fails, try refreshing the page</p>
        </div>
      )}

      {/* Call Active Tips */}
      {callStatus === "connected" && (
        <div className="mt-6 text-center text-sm text-light-400 space-y-1">
          <p>Speak clearly and take your time between responses</p>
          <p>Press <kbd className="px-1 py-0.5 bg-primary-200/20 rounded text-primary-200">Space</kbd> to end the call</p>
        </div>
      )}
    </div>
  );
}
