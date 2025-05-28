"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AgentProps {
  interviewId: string;
}

type CallStatus = "idle" | "connecting" | "connected" | "disconnected";

// Mock transcript data
const mockTranscript = [
  {
    speaker: "agent",
    message: "My name is John Doe, nice to meet you!",
    timestamp: new Date().toISOString(),
  },
  {
    speaker: "user",
    message: "Nice to meet you too! I'm excited for this interview.",
    timestamp: new Date().toISOString(),
  },
  {
    speaker: "agent",
    message:
      "Great! Let's start with a simple question. Can you tell me about yourself?",
    timestamp: new Date().toISOString(),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Agent({ interviewId }: AgentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isSpeaking, setIsSpeaking] = useState<"agent" | "user" | null>(null);
  const [transcript] = useState(mockTranscript);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);

  const handleCallAction = () => {
    switch (callStatus) {
      case "idle":
        setCallStatus("connecting");
        // Simulate connection delay
        setTimeout(() => {
          setCallStatus("connected");
          // Start conversation simulation
          simulateConversation();
        }, 2000);
        break;
      case "connected":
        setCallStatus("disconnected");
        setIsSpeaking(null);
        break;
      case "disconnected":
        setCallStatus("idle");
        setCurrentTranscriptIndex(0);
        break;
      default:
        break;
    }
  };

  const simulateConversation = () => {
    const nextIndex = currentTranscriptIndex;
    if (nextIndex < transcript.length) {
      const currentMessage = transcript[nextIndex];
      setIsSpeaking(currentMessage.speaker as "agent" | "user");
      setCurrentTranscriptIndex(nextIndex + 1);

      // Simulate speaking duration based on message length
      const speakingDuration = Math.max(
        2000,
        currentMessage.message.length * 50
      );

      setTimeout(() => {
        setIsSpeaking(null);

        // Continue to next message after a brief pause
        setTimeout(() => {
          if (nextIndex + 1 < transcript.length) {
            simulateConversation();
          }
        }, 1000);
      }, speakingDuration);
    }
  };

  const getButtonText = () => {
    switch (callStatus) {
      case "idle":
        return "Call";
      case "connecting":
        return "Connecting...";
      case "connected":
        return "End Call";
      case "disconnected":
        return "Call Again";
      default:
        return "Call";
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
      default:
        return "btn-call";
    }
  };

  return (
    <div className="w-full">
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
          <h3>AI Interviewer</h3>
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
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      {callStatus === "connected" && (
        <div className="transcript-border mt-8">
          <div className="transcript">
            <p>
              {currentTranscriptIndex > 0
                ? transcript[currentTranscriptIndex - 1]?.message
                : "My name is John Doe, nice to meet you!"}
            </p>
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
    </div>
  );
}
