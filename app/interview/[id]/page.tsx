"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AuthStatus } from "@/components/client/auth-status";
import { Agent } from "@/components/agent";
import Image from "next/image";

interface Interview {
  id: string;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  userId: string;
  createdAt: string;
  finalized: boolean;
}

export default function InterviewPage() {
  const params = useParams();
  const interviewId = params.id as string;
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        // Check if it's a new interview (starts with "interview_")
        if (interviewId.startsWith("interview_")) {
          setLoading(false);
          return; // This is a new interview setup
        }

        // Fetch existing interview data
        const response = await fetch(`/api/interview/${interviewId}`);
        const data = await response.json();

        if (data.success) {
          setInterview(data.interview);
        } else {
          setError(data.error || "Failed to load interview");
        }
      } catch (err) {
        console.error("Error fetching interview:", err);
        setError("Failed to load interview");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  const isSetupMode = interviewId.startsWith("interview_");
  const pageTitle = isSetupMode
    ? "Interview Setup"
    : interview
    ? `${interview.role} Interview`
    : "Interview";
  const pageSubtitle = isSetupMode
    ? "Let's set up your personalized AI interview"
    : interview
    ? `${interview.type} interview • ${interview.level} level`
    : "Loading...";

  if (loading) {
    return (
      <div className="min-h-screen bg-background pattern flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/logo.svg" alt="PrepWise Logo" width={64} height={64} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Loading Interview...</h1>
          <p className="text-light-100">
            Please wait while we prepare your session.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pattern flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/logo.svg" alt="PrepWise Logo" width={64} height={64} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-destructive-100">
            Error
          </h1>
          <p className="text-light-100">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pattern">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="PrepWise Logo" width={32} height={32} />
          <span className="text-lg sm:text-xl font-bold">PrepWise</span>
        </div>
        <AuthStatus />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-light-100 text-sm sm:text-base">{pageSubtitle}</p>

          {/* Interview Details */}
          {interview && (
            <div className="mt-4 p-3 sm:p-4 bg-dark-200 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                <div>
                  <span className="text-light-400">Role:</span>
                  <p className="font-medium">{interview.role}</p>
                </div>
                <div>
                  <span className="text-light-400">Type:</span>
                  <p className="font-medium capitalize">{interview.type}</p>
                </div>
                <div>
                  <span className="text-light-400">Level:</span>
                  <p className="font-medium capitalize">{interview.level}</p>
                </div>
                <div>
                  <span className="text-light-400">Questions:</span>
                  <p className="font-medium">{interview.questions.length}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-light-400 block mb-2">Tech Stack:</span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {interview.techstack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-200 text-dark-100 rounded text-xs whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Setup Mode Instructions */}
          {isSetupMode && (
            <div className="mt-4 p-3 sm:p-4 bg-blue-gradient-dark rounded-lg border border-primary-200/20">
              <h3 className="text-primary-200 font-semibold mb-2 text-sm sm:text-base">
                Interview Setup
              </h3>
              <p className="text-light-100 text-sm">
                Our AI assistant will help you create a personalized interview
                experience. You&apos;ll be asked about:
              </p>
              <ul className="mt-2 text-light-100 text-sm list-disc list-inside space-y-1 pl-2">
                <li>The role you&apos;re preparing for</li>
                <li>Your experience level</li>
                <li>Technology stack you want to focus on</li>
                <li>
                  Interview type preference (technical, behavioral, or mixed)
                </li>
              </ul>
              <div className="mt-3 p-2 bg-primary-200/10 rounded text-xs text-primary-200">
                💡 Tip: Speak clearly and take your time. You can pause between
                responses.
              </div>
            </div>
          )}
        </div>

        {/* Agent Component */}
        <Agent
          interviewId={interviewId}
          interviewData={interview ? (interview as unknown as Record<string, unknown>) : undefined}
          isSetupMode={isSetupMode}
        />
      </main>
    </div>
  );
}
