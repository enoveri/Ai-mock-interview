"use client";

import React from "react";
import Image from "next/image";
import { mappings } from "@/constants";

interface TechIconProps {
  techStack: string[];
}

const TechIcons: React.FC<TechIconProps> = ({ techStack }) => {
  // Function to normalize tech names
  const normalizeTechName = (tech: string): string => {
    const lowercaseTech = tech.toLowerCase();
    return mappings[lowercaseTech as keyof typeof mappings] || lowercaseTech;
  };

  // Get unique normalized tech names
  const uniqueTech = Array.from(new Set(techStack.map(normalizeTechName)));
  
  // Limit to 4 tech icons
  const displayTech = uniqueTech.slice(0, 4);
  const remainingCount = uniqueTech.length - displayTech.length;

  return (
    <div className="flex flex-wrap gap-2">
      {displayTech.map((tech, index) => (
        <div
          key={index}
          className="group relative bg-dark-300 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <Image
            src={`/tech.svg`}
            alt={tech}
            width={16}
            height={16}
            className="object-contain"
          />
          <div className="tech-tooltip">
            {tech.charAt(0).toUpperCase() + tech.slice(1)}
          </div>
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="bg-dark-300 rounded-full w-8 h-8 flex items-center justify-center text-xs">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default TechIcons;
