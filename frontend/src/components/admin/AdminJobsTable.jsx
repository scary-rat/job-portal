import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filtered);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <Table>
                <TableCaption className="text-sm text-muted-foreground mb-2">A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold text-gray-600">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-600">Role</TableHead>
                        <TableHead className="font-semibold text-gray-600">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50 transition-all">
                                <TableCell className="py-3 text-gray-800">{job?.company?.name}</TableCell>
                                <TableCell className="py-3 text-gray-800">{job?.title}</TableCell>
                                <TableCell className="py-3 text-gray-700 text-sm">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="focus:outline-none">
                                            <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-36 p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                                            >
                                                <Edit2 className="w-4 text-indigo-600" />
                                                <span className="text-sm">Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer mt-1"
                                            >
                                                <Eye className="w-4 text-blue-600" />
                                                <span className="text-sm">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                No jobs found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
