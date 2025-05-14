import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    // ✅ Initialize local status state using existing applicant status
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (applicants?.applications) {
            const initialStatus = {};
            applicants.applications.forEach((app) => {
                initialStatus[app._id] = app.status;
            });
            setStatus(initialStatus);
        }
    }, [applicants]);

    const statusHandler = async (selectedStatus, applicationId) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, {
                status: selectedStatus,
            });

            if (res.data.success) {
                toast.success(res.data.message);

                // ✅ Update status in local state
                setStatus((prev) => ({
                    ...prev,
                    [applicationId]: selectedStatus,
                }));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((app) => {
                        const applicant = app.applicant;
                        return (
                            <TableRow key={app._id}>
                                <TableCell>{applicant.fullname}</TableCell>
                                <TableCell>{applicant.email}</TableCell>
                                <TableCell>{applicant.phoneNumber}</TableCell>
                                <TableCell>
                                    {applicant.profile?.resume ? (
                                        <a
                                            className="text-blue-600 cursor-pointer"
                                            href={applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {applicant.profile.resumeOriginalName}
                                        </a>
                                    ) : (
                                        "NA"
                                    )}
                                </TableCell>
                                <TableCell>{new Date(applicant.createdAt).toISOString().split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36">
                                            {shortlistingStatus.map((statusOption) => {
                                                const currentStatus = status[app._id];
                                                const isCurrent = currentStatus === statusOption;
                                                return (
                                                    <div
                                                        key={statusOption}
                                                        onClick={() => statusHandler(statusOption, app._id)}
                                                        className="flex items-center space-x-2 my-2 cursor-pointer"
                                                    >
                                                        <span>{statusOption}</span>
                                                        {isCurrent &&
                                                            (statusOption === "accepted" ? (
                                                                <CheckCircle className="text-green-500" size={18} />
                                                            ) : (
                                                                <XCircle className="text-red-500" size={18} />
                                                            ))}
                                                    </div>
                                                );
                                            })}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
