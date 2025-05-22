"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import TechIcons from "@/components/tech-icons";

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const getCompanyLogo = (role: string) => {
  const companies = {
    "Frontend Developer": "/covers/skype.png",
    "Full Stack Developer": "/covers/amazon.png",
    "Backend Developer": "/covers/facebook.png",
    "DevOps Engineer": "/covers/reddit.png",
    "Mobile Developer": "/covers/quora.png",
    "UI/UX Designer": "/covers/adobe.png",
    "Data Scientist": "/covers/spotify.png",
    "Product Manager": "/covers/telegram.png",
    "QA Engineer": "/covers/yahoo.png",
    "System Architect": "/covers/hostinger.png",
    "Business Analyst": "/covers/pinterest.png",
    "Cybersecurity Specialist": "/covers/tiktok.png",
  };

  // Default to skype if role not found
  return companies[role as keyof typeof companies] || "/covers/skype.png";
};

const InterviewCard: React.FC<InterviewCardProps> = ({
  interviewId = "new",
  role,
  type,
  techstack,
  createdAt,
}) => {
  const formattedDate = createdAt
    ? dayjs(createdAt).format("MMM DD, YYYY")
    : "";

  const badgeColor = 
    type === "Technical" ? "bg-blue-500/20 text-blue-400" :
    type === "Mixed" ? "bg-purple-500/20 text-purple-400" :
    type === "Behavioral" ? "bg-green-500/20 text-green-400" :
    "bg-gray-500/20 text-gray-400";

  return (
    <div className="dark-gradient rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden w-12 h-12 bg-gray-800 flex items-center justify-center">
            <Image
              src={getCompanyLogo(role)}
              alt={role}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{role}</h3>
            <p className="text-sm text-light-100">Interview</p>
          </div>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${badgeColor}`}>
          {type}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-light-100">
        <Image src="/calendar.svg" alt="Calendar" width={16} height={16} />
        <span>{formattedDate || "Not started yet"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Image src="/star.svg" alt="Rating" width={16} height={16} />
        <span className="text-sm text-light-100">—/100</span>
      </div>

      <div className="mt-auto">
        <TechIcons techStack={techstack} />
        <div className="mt-4">
          <Link href={`/interview/${interviewId}`}>
            <Button className="w-full bg-dark-200 hover:bg-dark-300 text-white">
              {createdAt ? "Continue Interview" : "Take Interview"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
