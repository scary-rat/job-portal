import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    // Local state to hold the search query
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Filter jobs based on the search query
    const filteredJobs = allJobs.filter((job) => {
        const query = searchQuery.toLowerCase();
        return (
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query) ||
            job.company?.name.toLowerCase().includes(query) // Optional: if you want to search by company name too
        );
    });

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">Search Results ({filteredJobs.length})</h1>

                {/* Search Input Field */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by job title, company, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Display job cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredJobs.length === 0 ? (
                        <div className="col-span-3 flex justify-center items-center">
                            {/* No Jobs Found Card */}
                            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md mx-auto text-center border border-gray-200">
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
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h2>
                                <p className="text-gray-500 mb-4">We couldn't find any jobs matching your search.</p>
                                <p className="text-gray-500 text-sm">Try adjusting your keywords, job title, or location.</p>
                            </div>
                        </div>
                    ) : (
                        filteredJobs.map((job) => {
                            return <Job key={job._id} job={job} />;
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
