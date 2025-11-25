import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/PYK INVEST Brand identity-23.svg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
const SignupPage = () => {

    // ─── Individual States ──────────────────────────────
    const [userName, setUserName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        userName: "",

        email: "",
        password: "",
        confirmPassword: "",
        general: "",
    });

    // ─── Validation ─────────────────────────────────────
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            userName: "",

            email: "",
            password: "",
            confirmPassword: "",
            general: "",
        };

        if (!userName.trim()) {
            newErrors.userName = "First name is required";
            valid = false;
        }


        if (!email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            valid = false;
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // ─── Submit Handler ─────────────────────────────────
    const handleSignup = async (e: any) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                "auth/signup",
                { userName, email, password },
                { withCredentials: true }
            );

            const data = response.data as { token: string; user: any };
            setLoading(false);

            toast.success("Signup successful!");

            // Save to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/Admin");
        } catch (error: any) {
            setLoading(false);

            if (error.response) {
                // Server response with error message
                toast.error(error.response.data.error || "Signup failed. Please try again.");
            } else {
                // Network or other errors
                toast.error("An error occurred. Please try again.");
            }

            console.error(error);
        }
    };

    // ════════════════════════════════════════════════════════
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
                        <img src={logo} alt="PYK Logo" className="h-full w-full object-contain" />
                    </div>

                    <h2 className="text-3xl font-semibold">Create Account</h2>
                    <p className="text-gray-600 text-sm mt-1 text-center">
                        Join us today!
                    </p>
                </div>

                {/* General Error */}
                {errors.general && (
                    <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
                        {errors.general}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-5">

                    {/* First Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            className={`border rounded-lg px-3 py-2 w-full focus:ring-2 focus:outline-none
                                    ${errors.userName ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"}`}
                            placeholder="John"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className={`border rounded-lg px-3 py-2 w-full focus:ring-2 focus:outline-none
                                    ${errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"}`}
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`border rounded-lg px-3 py-2 w-full focus:ring-2 pr-12 focus:outline-none
                                        ${errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"}`}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                            >
                                {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`border rounded-lg px-3 py-2 w-full pr-12 focus:ring-2 focus:outline-none
                                        ${errors.confirmPassword ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-black"}`}
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                            >
                                {showConfirmPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue text-white py-2 rounded-lg text-sm font-semibold transition-all
                                        ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-900"}`}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                {/* Already Have Account */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-blue font-medium hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignupPage;
