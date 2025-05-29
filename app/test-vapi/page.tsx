"use client";

import { useState, useEffect } from "react";
import { vapi } from "@/lib/vapi.sdk";

export default function TestVapi() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  useEffect(() => {
    addLog("Testing Vapi initialization...");

    try {
      // Test if Vapi is properly initialized
      if (vapi) {
        addLog("✅ Vapi SDK initialized successfully");

        // Set up event listeners
        vapi.on("call-start", () => {
          addLog("📞 Call started");
          setIsConnected(true);
        });

        vapi.on("call-end", () => {
          addLog("📴 Call ended");
          setIsConnected(false);
        });

        vapi.on("error", (error) => {
          console.error("Vapi error object:", error);

          // Skip empty error objects that seem to be SDK-related
          if (
            error &&
            typeof error === "object" &&
            Object.keys(error).length === 0
          ) {
            addLog(`⚠️ Vapi SDK emitted empty error (likely non-critical)`);
            return;
          }

          let errorMessage = "Unknown error";

          if (error && typeof error === "object") {
            if (error.message) {
              errorMessage = error.message;
            } else if (
              error.toString &&
              error.toString() !== "[object Object]"
            ) {
              errorMessage = error.toString();
            } else {
              // Try to extract useful info from Response objects
              errorMessage = `Error type: ${
                error.constructor?.name || "Unknown"
              }`;
              if (error.status) errorMessage += `, Status: ${error.status}`;
              if (error.statusText) errorMessage += `, ${error.statusText}`;
            }
          } else {
            errorMessage = String(error);
          }

          addLog(`❌ Vapi error: ${errorMessage}`);
          setError(errorMessage);
        });

        vapi.on("message", (message) => {
          addLog(`💬 Message: ${JSON.stringify(message)}`);
        });
      } else {
        addLog("❌ Vapi SDK not initialized");      setError("Vapi SDK not initialized");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog(`❌ Error during initialization: ${errorMessage}`);
      setError(errorMessage);
    }
  }, []);

  const testCall = async () => {
    try {
      addLog("🚀 Starting test call...");

      await vapi.start({
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful test assistant. Say hello and ask how you can help.",
            },
          ],
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
      });      addLog("✅ Call started successfully");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog(`❌ Error starting call: ${errorMessage}`);
      setError(errorMessage);
    }
  };

  const endCall = () => {
    try {
      vapi.stop();
      addLog("🛑 Call stopped");    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog(`❌ Error stopping call: ${errorMessage}`);
      setError(errorMessage);
    }
  };

  const testWorkflow = async () => {
    try {
      addLog("🔄 Testing workflow mode...");

      const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
      if (!workflowId) {
        addLog("❌ Workflow ID not configured");
        setError("Workflow ID not configured");
        return;
      }

      addLog(`📋 Using workflow ID: ${workflowId.substring(0, 8)}...`);

      const result = await vapi.start(workflowId, {
        variableValues: {
          userid: "test-user",
          interviewId: "test-interview-123",
        },
      });

      addLog(`✅ Workflow started successfully`);
      if (result && result.id) {
        addLog(`📞 Call ID: ${result.id}`);
      }    } catch (err: unknown) {
      console.error("Workflow error:", err);
      let errorMessage = "Unknown workflow error";

      if (err && typeof err === "object") {
        if ("message" in err && typeof err.message === "string") {
          errorMessage = err.message;
        } else if ("response" in err && err.response && typeof err.response === "object") {
          // Handle HTTP response errors
          const response = err.response as any;
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;          if (response.data) {
            errorMessage += ` - ${JSON.stringify(response.data)}`;
          }
        } else if ("toString" in err && typeof err.toString === "function" && err.toString() !== "[object Object]") {
          errorMessage = err.toString();
        }
      } else {
        errorMessage = String(err);
      }

      addLog(`❌ Error starting workflow: ${errorMessage}`);
      setError(errorMessage);
    }
  };

  const testWorkflowCleaned = async () => {
    try {
      addLog("🧹 Testing workflow with cleaned ID...");

      // Remove the -e4127 suffix from workflow ID
      const originalWorkflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
      if (!originalWorkflowId) {
        addLog("❌ Workflow ID not configured");
        setError("Workflow ID not configured");
        return;
      }

      // Clean the workflow ID by removing any suffix after the main UUID
      const cleanedWorkflowId = originalWorkflowId.split("-e4127")[0];
      addLog(`📋 Original: ${originalWorkflowId.substring(0, 12)}...`);
      addLog(`🧹 Cleaned: ${cleanedWorkflowId.substring(0, 12)}...`);

      const result = await vapi.start(cleanedWorkflowId, {
        variableValues: {
          userid: "test-user",
          interviewId: "test-interview-123",
        },
      });

      addLog(`✅ Cleaned workflow started successfully`);
      if (result && result.id) {
        addLog(`📞 Call ID: ${result.id}`);
      }    } catch (err: unknown) {
      console.error("Cleaned workflow error:", err);
      let errorMessage = "Unknown workflow error";

      if (err && typeof err === "object") {
        if ("message" in err && typeof err.message === "string") {
          errorMessage = err.message;
        } else if ("response" in err && err.response && typeof err.response === "object") {
          const response = err.response as any;
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          if (response.data) {
            errorMessage += ` - ${JSON.stringify(response.data)}`;
          }
        } else if (err.toString && err.toString() !== "[object Object]") {
          errorMessage = err.toString();
        }
      } else {
        errorMessage = String(err);
      }

      addLog(`❌ Error with cleaned workflow: ${errorMessage}`);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Vapi Integration Test
          </h1>
          <p className="text-gray-600">
            Test voice AI integration and authentication
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">📊</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Connection Status
                </h2>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-4 h-4 rounded-full ${
                    isConnected ? "bg-green-500 animate-pulse" : "bg-gray-300"
                  } shadow-lg`}
                ></div>
                <span
                  className={`font-medium ${
                    isConnected ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {isConnected ? "🔊 Connected" : "🔇 Disconnected"}
                </span>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <div>
                      <h4 className="text-red-800 font-medium">Error</h4>
                      <p className="text-red-700 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={testCall}
                  disabled={isConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {isConnected ? "🔊 Call Active" : "🎤 Start Test Call"}
                </button>
                <button
                  onClick={testWorkflow}
                  disabled={isConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {isConnected ? "🔊 Workflow Active" : "⚙️ Test Workflow"}
                </button>
                <button
                  onClick={testWorkflowCleaned}
                  disabled={isConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {isConnected ? "🔊 Cleaned Active" : "🧹 Test Cleaned ID"}
                </button>
                <button
                  onClick={endCall}
                  disabled={!isConnected}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  📴 End Call
                </button>
              </div>
            </div>

            {/* Environment Check */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Environment
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    VAPI_WEB_TOKEN
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN
                      ? "✅ Set"
                      : "❌ Not set"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    VAPI_WORKFLOW_ID
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
                      ? "✅ Set"
                      : "❌ Not set"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">📝</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Live Logs
                  </h2>
                </div>
                <div className="text-sm text-gray-500">
                  {logs.length} {logs.length === 1 ? "entry" : "entries"}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto border">
                {logs.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">🔍</span>
                      <p>No logs yet. Start a test call to see activity.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`text-sm font-mono p-2 rounded ${
                          log.includes("✅")
                            ? "text-green-400 bg-green-900/20"
                            : log.includes("❌")
                            ? "text-red-400 bg-red-900/20"
                            : log.includes("📞") || log.includes("📴")
                            ? "text-blue-400 bg-blue-900/20"
                            : log.includes("💬")
                            ? "text-yellow-400 bg-yellow-900/20"
                            : log.includes("🚀")
                            ? "text-purple-400 bg-purple-900/20"
                            : "text-gray-300"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {logs.length > 0 && (
                <button
                  onClick={() => setLogs([])}
                  className="mt-4 px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  🗑️ Clear Logs
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-blue-500 text-xl">💡</span>
            <div>
              <h3 className="text-blue-800 font-semibold mb-2">
                Testing Instructions
              </h3>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">                <li>
                  Check that environment variables show &quot;✅ Set&quot; in the
                  Environment panel
                </li>
                <li>Click &quot;Start Test Call&quot; to initiate a voice connection</li>
                <li>
                  Monitor the Live Logs for any authentication or connection
                  errors
                </li>
                <li>
                  If successful, you should see call events and be able to speak
                  with the AI
                </li>                <li>
                  Use &quot;End Call&quot; to terminate the connection when testing is
                  complete
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
