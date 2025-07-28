"use client";
import React from "react";
import Link from "next/link";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useForm } from "react-hook-form";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    interface LoginFormData {
        email: string;
        password: string;
    }

    interface LoginResponse {
        success: boolean;
        message: string;
    }

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result: LoginResponse = await response.json();
            
            console.log(result.message);
        } catch (error) {
            console.log('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
            <Header />

            {/* Main Section */}
            <section className="flex-grow flex max-h-[calc(100vh-120px)]">
                {/* Left Side - Image */}
                <span className="hidden md:flex md:w-1/2 bg-white-900 items-center justify-center">
                    <div className="text-center text-white p-6">
                        <img
                            src="/login.png"
                            alt="Login Illustration"
                            className="w-full max-w-xs mx-auto mb-4"
                        />
                    </div>
                </span>

                {/* Right Side - Login Form */}
                <span className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full space-y-5">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">Sign In</h2>
                            <p className="mt-1 text-gray-600 text-sm">Access your account</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="Email"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    {...register("password", { required: true })}
                                    placeholder="Password"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-900 transition font-medium text-sm"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-blue-500 hover:text-blue-900 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </span>
            </section>

            <Footer />
        </div>
    );
}

export default Login;
