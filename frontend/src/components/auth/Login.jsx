import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const setRole = (role) => {
        setInput({ ...input, role });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-md border border-gray-200 shadow-lg rounded-lg p-6 my-10 bg-white"
                >
                    <h1 className="font-bold text-2xl mb-6 text-center text-[#5b30a6]">Login</h1>

                    <div className="mb-4">
                        <Label className="block mb-2">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="block mb-2">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-6">
                        <Label className="block mb-2">Select Role</Label>
                        <div className="flex gap-4">
                            {["student", "recruiter"].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setRole(role)}
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

                    {loading ? (
                        <Button className="w-full mb-4 bg-[#6A38C2] hover:bg-[#5b30a6]" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mb-4 bg-[#6A38C2] hover:bg-[#5b30a6]">
                            Login
                        </Button>
                    )}

                    <p className="text-sm text-center">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-[#5b30a6] hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
