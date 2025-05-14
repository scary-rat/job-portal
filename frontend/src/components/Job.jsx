import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="transform transition-all hover:scale-105 p-6 rounded-xl shadow-lg bg-white border border-gray-200 hover:shadow-2xl cursor-pointer">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
            </div>

            <div className="flex items-center gap-3 my-4">
                <Button className="p-3" variant="outline" size="icon">
                    <Avatar className="shadow-md">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-xl text-gray-800 my-3">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center gap-3 mt-5">
                <Badge className="text-blue-600 font-bold whitespace-nowrap max-w-xs truncate" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-pink-500 font-bold whitespace-nowrap max-w-xs truncate" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-gray-500 font-bold whitespace-nowrap max-w-xs truncate" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className="flex items-center gap-5 mt-6">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="hover:bg-blue-50 transition-all"
                >
                    Details
                </Button>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:bg-gradient-to-l transition-all"
                >
                    Apply Now
                </Button>
            </div>
        </div>
    );
};

export default Job;
