import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Update Profile</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Fill in the fields below to update your profile.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-md font-medium">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-md font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                        <Label htmlFor="phoneNumber" className="text-md font-medium">
                            Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="9876543210"
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-1">
                        <Label htmlFor="bio" className="text-md font-medium">
                            Bio
                        </Label>
                        <Input
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    {/* Skills */}
                    <div className="space-y-1">
                        <Label htmlFor="skills" className="text-md font-medium">
                            Skills
                        </Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="e.g., HTML, CSS, React, Node.js"
                        />
                    </div>

                    {/* Resume */}
                    <div className="space-y-1">
                        <Label htmlFor="file" className="text-md font-medium">
                            Resume (PDF)
                        </Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                            {loading && <Loader2 className="animate-spin h-4 w-4" />}
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
