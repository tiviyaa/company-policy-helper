"use client";
import React from "react";
import Link from "next/link";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useForm } from "react-hook-form";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormData>();

    interface RegisterFormData {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });
            
            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.log('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
            <Header />

            {/* Main Section */} 
            <div className="flex-grow flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="hidden md:flex md:w-1/2 bg-white-900 items-center justify-center">
                    <div className="text-center text-white p-6">
                        <img
                            src="/login.png"
                            alt="Register Illustration"
                            className="w-full max-w-xs mx-auto mb-4"
                        />
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full space-y-5">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">Sign Up</h2>
                            <p className="mt-1 text-gray-600 text-sm">Create your new account</p>
                        </div>

                        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Full Name"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                            </div>

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
                                    {...register("password", { required: true, minLength: 6 })}
                                    placeholder="Password"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-xs">
                                        Password is required (min 6 characters)
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === password || "Passwords don't match"
                                    })}
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
                                )}
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-900 transition font-medium text-sm"
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-500 hover:text-blue-900 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Register;
