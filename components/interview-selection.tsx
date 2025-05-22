"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InterviewOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
}

const interviewOptions: InterviewOption[] = [
  {
    id: "full-stack",
    title: "Full-Stack Dev Interview",
    description: "Practice common full-stack development questions covering both frontend and backend technologies.",
    icon: "/covers/yahoo.png",
    type: "Technical",
  },
  {
    id: "devops",
    title: "DevOps & Cloud Interview",
    description: "Prepare for questions about CI/CD, containerization, cloud services, and infrastructure.",
    icon: "/covers/reddit.png",
    type: "Technical",
  },
  {
    id: "hr",
    title: "HR Screening Interview",
    description: "Practice answering common HR screening questions about your background and experience.",
    icon: "/covers/telegram.png",
    type: "Behavioral",
  },
  {
    id: "system-design",
    title: "System Design Interview",
    description: "Practice designing scalable systems and explaining architectural decisions.",
    icon: "/covers/facebook.png",
    type: "Technical",
  },
  {
    id: "business-analyst",
    title: "Business Analyst Interview",
    description: "Prepare for questions about requirements gathering, analysis, and documentation.",
    icon: "/covers/spotify.png",
    type: "Mixed",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Dev Interview",
    description: "Practice answering questions about mobile app development for iOS and Android.",
    icon: "/covers/quora.png",
    type: "Technical",
  },
  {
    id: "database",
    title: "Database & SQL Interview",
    description: "Prepare for questions about database design, SQL queries, and optimization.",
    icon: "/covers/pinterest.png",
    type: "Technical",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Interview",
    description: "Practice answering questions about security principles, threats, and best practices.",
    icon: "/covers/skype.png",
    type: "Technical",
  },
  {
    id: "sales-marketing",
    title: "Sales & Marketing Interview",
    description: "Prepare for questions about sales strategies, marketing campaigns, and customer acquisition.",
    icon: "/covers/tiktok.png",
    type: "Behavioral",
  },
];

const InterviewSelection: React.FC = () => {
  return (
    <section className="mx-6 my-12">
      <h2 className="text-2xl font-bold mb-6">Pick Your Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewOptions.map((option) => (
          <div 
            key={option.id}
            className="dark-gradient rounded-lg p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full overflow-hidden w-10 h-10 bg-gray-800 flex items-center justify-center">
                  <Image
                    src={option.icon}
                    alt={option.title}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold">{option.title}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                option.type === "Technical" ? "bg-blue-500/20 text-blue-400" :
                option.type === "Mixed" ? "bg-purple-500/20 text-purple-400" :
                "bg-green-500/20 text-green-400"
              }`}>
                {option.type}
              </span>
            </div>
            
            <p className="text-sm text-light-100">{option.description}</p>
            
            <div className="mt-auto pt-2">
              <Link href={`/interview/new?type=${option.id}`}>
                <Button className="w-full bg-dark-200 hover:bg-dark-300 text-white">
                  Take Interview
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InterviewSelection;
