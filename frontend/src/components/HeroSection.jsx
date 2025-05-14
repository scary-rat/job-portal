import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/remote-work.svg";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="w-full bg-gradient-to-r from-[#F8F6FF] to-[#F1F1FF] py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left: Text & Search */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white shadow text-[#6A38C2] text-sm font-semibold">
                        🚀 The Most Reliable Job Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Find Work <br />
                        That <span className="text-[#6A38C2]">Works for You</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Discover thousands of job opportunities tailored to your skills. Your next big career move starts here.
                    </p>

                    {/* Search Input */}
                    <div className="flex items-center w-full max-w-md mx-auto lg:mx-0 bg-white rounded-full shadow-md border border-gray-200 overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search jobs by title, skill, or company..."
                            className="flex-grow px-6 py-3 text-base text-gray-700 focus:outline-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="h-[48px] px-6 rounded-none bg-[#6A38C2] hover:bg-[#5a2db4] transition-colors duration-200"
                        >
                            <Search className="h-5 w-5 text-white" />
                        </Button>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Trending:</span> React, UI/UX, Data Analyst, Remote
                    </div>
                </div>

                {/* Right: Image */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img src={HeroImage} alt="Job search illustration" className="w-full max-w-sm" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
