import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Briefcase, MapPin, Calendar, DollarSign, Users, FileText } from "lucide-react";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    console.log(singleJob);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar></Navbar>
            <div className="max-w-5xl mx-auto my-12 px-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{singleJob?.title}</h1>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <Badge className="text-blue-600 font-bold whitespace-nowrap max-w-xs truncate" variant="ghost">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className="text-pink-500 font-bold whitespace-nowrap max-w-xs truncate" variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="text-gray-500 font-bold whitespace-nowrap max-w-xs truncate" variant="ghost">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`mt-4 sm:mt-0 px-6 py-3 text-white font-semibold rounded-lg ${
                                isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"
                            }`}
                        >
                            {isApplied ? "Already Applied" : "Apply Now"}
                        </Button>
                    </div>

                    {/* Job Details */}
                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <Briefcase className="text-blue-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Role</p>
                                    <p className="text-gray-600">{singleJob?.title}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="text-green-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Location</p>
                                    <p className="text-gray-600">{singleJob?.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FileText className="text-yellow-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Description</p>
                                    <p className="text-gray-600">{singleJob?.description}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Users className="text-pink-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Applicants</p>
                                    <p className="text-gray-600">{singleJob?.applications?.length} candidates</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <DollarSign className="text-emerald-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Salary</p>
                                    <p className="text-gray-600">₹ {singleJob?.salary} LPA</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="text-indigo-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Posted On</p>
                                    <p className="text-gray-600">{singleJob?.createdAt?.split("T")[0] || "N/A"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Briefcase className="text-red-600 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold">Experience</p>
                                    <p className="text-gray-600">{singleJob?.experienceLevel} years</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDescription;
