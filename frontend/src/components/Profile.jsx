import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    console.log(user);

    return (
        <div className="bg-gray-100 min-h-screen pb-10">
            <Navbar />
            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl my-8 p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 ring-2 ring-blue-500">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio || "No bio provided."}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="text-sm">
                        <Pen className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                </div>

                <div className="border-t mt-6 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                        <Mail className="text-blue-500 w-5 h-5" />
                        <span>{user?.email || "Not Available"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Contact className="text-green-600 w-5 h-5" />
                        <span>{user?.phoneNumber || "Not Available"}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills?.length > 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge
                                    key={index}
                                    className="text-pink-500 font-bold whitespace-nowrap max-w-xs truncate"
                                    variant="ghost"
                                >
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-500">NA</span>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <Label className="text-md font-bold text-gray-800">Resume</Label>
                    <div className="mt-1">
                        {isResume ? (
                            <a
                                target="_blank"
                                href={user?.profile?.resume}
                                className="inline-flex items-center text-blue-600 hover:underline text-sm"
                            >
                                <FileText className="w-4 h-4 mr-1" />
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-gray-500 text-sm">NA</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl px-6 py-6">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
