"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AuthStatus } from "@/components/client/auth-status";
import { Agent } from "@/components/agent";
import Image from "next/image";

export default function InterviewPage() {
  const params = useParams();
  const interviewId = params.id as string;

  return (
    <div className="min-h-screen bg-background pattern">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="PrepWise Logo" width={32} height={32} />
          <span className="text-xl font-bold">PrepWise</span>
        </div>
        <AuthStatus />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Interview Generation</h1>
        </div>

        {/* Agent Component */}
        <Agent interviewId={interviewId} />
      </main>
    </div>
  );
}
