import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-md border border-gray-200 shadow-lg rounded-lg p-6 my-10 bg-white"
                >
                    <h1 className="font-bold text-2xl mb-6 text-center text-[#5b30a6]">Sign Up</h1>

                    <div className="mb-4">
                        <Label className="block mb-2">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="block mb-2">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john.doe@example.com"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="block mb-2">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={(e) => {
                                // Allow only numeric input
                                const newValue = e.target.value.replace(/[^0-9]/g, "");
                                setInput({ ...input, phoneNumber: newValue });
                            }}
                            placeholder="123-456-7890"
                            inputMode="numeric" // Ensures the numeric keypad is shown on mobile devices
                            pattern="[0-9]*" // Ensures only numbers can be typed
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="block mb-2">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>

                    <div className="mb-6">
                        <Label className="block mb-2">Select Role</Label>
                        <div className="flex gap-4">
                            {["student", "recruiter"].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setInput({ ...input, role })}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                                        input.role === role
                                            ? "bg-[#6A38C2] hover:bg-[#5b30a6] text-white border-[#6A38C2] shadow"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <Label className="block mb-2">Profile Picture</Label>
                        <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer" />
                    </div>

                    {loading ? (
                        <Button className="w-full mb-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white border-[#6A38C2]" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mb-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white border-[#6A38C2]">
                            Sign Up
                        </Button>
                    )}

                    <p className="text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#5b30a6] hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
