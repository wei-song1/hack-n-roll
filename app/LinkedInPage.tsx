"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  logo?: string;
}

interface LinkedInPageProps {
  onSuccess?: () => void;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Fakeversity of Singapore",
    location: "Singapore · Hybrid",
    type: "Full-time",
    posted: "1 day ago",
    logo: "/company1.png",
  },
  {
    id: 2,
    title: "Janitor Internship",
    company: "EduTech Labs",
    location: "Remote",
    type: "Contract",
    posted: "3 days ago",
    logo: "/company2.png",
  },
  {
    id: 3,
    title: "Product Fry Cook Handler",
    company: "CampusWorks",
    location: "Singapore · On-site",
    type: "Full-time",
    posted: "1 week ago",
    logo: "/company3.png",
  },
];

const LinkedInPage: React.FC<LinkedInPageProps> = ({ onSuccess }) => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const handleApply = (job: Job) => {
    console.log("Apply clicked for:", job);
    if (onSuccess) onSuccess(); // ← go to next game
  };

  return (
    <div className="flex justify-center py-6">
      <section className="bg-white rounded-md shadow-sm border border-gray-200 w-full max-w-2xl overflow-hidden">
        <div className="border-b border-gray-200 px-3 py-2 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{mockJobs.length}</span> job results
          </p>
        </div>

        <ul className="divide-y divide-gray-200">
          {mockJobs.map((job) => {
            const isSelected = job.id === selectedJobId;
            return (
              <li
                key={job.id}
                className={`px-3 py-3 hover:bg-gray-50 transition-colors ${
                  isSelected ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedJobId(job.id)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    {job.logo ? (
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#0a66c2]">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-700">{job.company}</p>
                    <p className="text-xs text-gray-500">{job.location}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {job.type} · {job.posted}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // don't trigger row selection
                        handleApply(job);
                      }}
                      className="mt-2 inline-block bg-[#0a66c2] text-white text-xs font-semibold py-1.5 px-3 rounded-full hover:bg-[#004182]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default LinkedInPage;