"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthStatus } from "@/components/client/auth-status";
import Image from "next/image";

export default function NewInterviewPage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a new interview ID and redirect
    const interviewId = `interview_${Date.now()}`;
    router.push(`/interview/${interviewId}`);
  }, [router]);

  return (
    <div className="min-h-screen bg-background pattern flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="PrepWise Logo" width={64} height={64} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Starting Interview...</h1>
        <p className="text-light-100">Please wait while we prepare your interview session.</p>
      </div>
    </div>
  );
}
