import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth); // Assuming user details are in auth slice
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Filter jobs based on the search query and the searchedQuery from Redux
    useEffect(() => {
        let filteredJobs = allJobs;

        // Apply both local search query and the searchedQuery from Redux
        if (searchQuery || searchedQuery) {
            filteredJobs = filteredJobs.filter((job) => {
                const query = searchQuery.toLowerCase() || searchedQuery.toLowerCase();
                return (
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.location.toLowerCase().includes(query) ||
                    job.company?.name.toLowerCase().includes(query) // Assuming each job has a company name
                );
            });
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchQuery, searchedQuery]);

    // Handle login button click (if you want to trigger login action)
    const handleLoginClick = () => {
        navigate("/login"); // Redirect to login page
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 px-4">
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Filter sidebar */}
                    <div className="w-full lg:w-[200px]">
                        <FilterCard />
                    </div>

                    {/* Job cards area */}
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5 overflow-hidden">
                        {/* If user is not logged in, show the login message */}
                        {!user ? (
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto mb-4 h-16 w-16 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M9.75 9.75L7.5 12m0 0l2.25 2.25M7.5 12h9m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Please log in to view jobs</h2>
                                <p className="text-gray-500 mb-4">You need to be logged in to view job listings.</p>
                                <button
                                    onClick={handleLoginClick}
                                    className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white border-[#6A38C2]  py-2 rounded-md transition-colors"
                                >
                                    Log In
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Search input */}
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search by job title, company, location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                {/* Displaying no jobs found message if no jobs match */}
                                {filterJobs.length <= 0 ? (
                                    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mx-auto mb-4 h-16 w-16 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M9.75 9.75L7.5 12m0 0l2.25 2.25M7.5 12h9m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h2>
                                        <p className="text-gray-500 mb-4">We couldn't find any jobs matching your search.</p>
                                        <p className="text-gray-500 text-sm">
                                            Try adjusting your keywords, job title, or location.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
