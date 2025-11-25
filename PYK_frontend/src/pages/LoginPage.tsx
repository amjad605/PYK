import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/PYK INVEST Brand identity-23.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "", general: "" });
    const navigate = useNavigate();
    const validateForm = () => {
        let formErrors = { email: "", password: "", general: "" };
        let isValid = true;

        if (!email) {
            formErrors.email = "Email is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            formErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!password) {
            formErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                "auth/login",
                { email, password },
                { withCredentials: true }
            );

            const data = response.data as { token: string; user: any };
            setLoading(false);

            toast.success("Login successful!");

            // Save to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/Admin");
        } catch (error: any) {
            setLoading(false);

            if (error.response) {
                // Server response with error message
                toast.error(error.response.data.error || "Login failed. Please try again.");
            } else {
                // Network or other errors
                toast.error("An error occurred. Please try again.");
            }

            console.error(error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
                        <img src={logo} alt="PYK Logo" className="h-full w-full object-contain" />
                    </div>

                    <h2 className="text-3xl font-semibold">Login</h2>
                    <p className="text-gray-600 text-sm mt-1 text-center">
                        Welcome back! Please sign in.
                    </p>
                </div>

                {/* General Error */}
                {errors.general && (
                    <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
                        {errors.general}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className={`border rounded-lg px-3 py-2 w-full focus:ring-2 focus:outline-none ${errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"
                                }`}
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`border rounded-lg px-3 py-2 w-full focus:ring-2 pr-12 focus:outline-none ${errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"
                                    }`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                            >
                                {showPassword ? (
                                    < AiOutlineEye size={22} />
                                ) : (
                                    <AiOutlineEyeInvisible size={22} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button type="button" className="text-sm text-black hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue  text-white py-2 rounded-lg text-sm font-semibold transition-all ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-900"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="mx-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Signup */}
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to={'/signup'} className="text-blue font-medium hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
