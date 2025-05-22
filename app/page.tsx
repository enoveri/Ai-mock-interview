"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { dummyInterviews } from "@/constants";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/interview-card";
import InterviewSelection from "@/components/interview-selection";
import Footer from "@/components/footer";
import { AuthStatus } from "@/components/client/auth-status";
import { useAuth } from "@/providers/auth-provider";

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="PrepWise Logo" width={32} height={32} />
          <span className="text-xl font-bold">PrepWise</span>
        </div>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="text-sm">Loading...</div>
          ) : user ? (
            <AuthStatus />
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="blue-gradient-dark rounded-3xl mx-6 my-8 p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h1>
          <p className="text-light-100">
            Practice on real interview questions & get instant feedback
          </p>
          <Link href="/interview/new">
            <Button className="bg-primary-200 text-dark-100 hover:bg-primary-200/80 rounded-full px-6 py-2">
              Start an Interview
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
          <Image
            src="/robot.png"
            alt="AI Interview Robot"
            width={350}
            height={350}
            className="z-10"
          />
          {/* Floating elements */}
          <div className="absolute top-0 right-0 animate-float-slow">
            <Image
              src="/covers/skype.png"
              alt="Skype"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="absolute top-1/4 right-1/4 animate-float">
            <Image
              src="/covers/amazon.png"
              alt="Amazon"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float-slow">
            <Image
              src="/covers/facebook.png"
              alt="Facebook"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-1/3 animate-float">
            <Image
              src="/covers/spotify.png"
              alt="Spotify"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="mx-6 my-8">
        <h2 className="text-2xl font-bold mb-6">Your Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              role={interview.role}
              type={interview.type}
              techstack={interview.techstack}
              createdAt={interview.createdAt}
            />
          ))}
        </div>
      </section>

      {/* Interview Selection Section */}
      <InterviewSelection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
