import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// Mock job data for fallback
const mockJobs = [
    {
        _id: "1",
        company: { name: "TechCorp" },
        title: "Frontend Developer",
        description: "Developing interactive user interfaces for web applications.",
        position: "3",
        jobType: "Full-Time",
        salary: "5",
    },
    {
        _id: "2",
        company: { name: "DevWorks" },
        title: "Backend Developer",
        description: "Building robust backend systems for scalable applications.",
        position: "2",
        jobType: "Part-Time",
        salary: "6",
    },
    {
        _id: "3",
        company: { name: "Creative Studios" },
        title: "Graphic Designer",
        description: "Creating visual designs for digital and print media.",
        position: "1",
        jobType: "Freelance",
        salary: "4",
    },
    {
        _id: "4",
        company: { name: "Data Solutions" },
        title: "Data Scientist",
        description: "Analyzing and interpreting complex data to assist decision-making.",
        position: "5",
        jobType: "Full-Time",
        salary: "7",
    },
    {
        _id: "5",
        company: { name: "WebWorks" },
        title: "FullStack Developer",
        description: "Developing both client and server software.",
        position: "4",
        jobType: "Contract",
        salary: "8",
    },
    {
        _id: "6",
        company: { name: "DesignPro" },
        title: "UI/UX Designer",
        description: "Creating user-centered designs for web and mobile applications.",
        position: "2",
        jobType: "Part-Time",
        salary: "5",
    },
];

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-bold text-center mb-10">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>

            {allJobs.length <= 0 ? (
                ""
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}

            {/* Fallback to mock jobs if no jobs available */}
            {allJobs.length <= 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {mockJobs.map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestJobs;
