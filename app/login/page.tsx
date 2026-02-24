"use client"

import { useState, useEffect } from "react"
import LoginPageImage from "@/public/images/login_image.jpg"
import LoginPageImage1 from "@/public/images/login_image1.jpg"
import LoginPageImage2 from "@/public/images/login_image2.jpg"

export default function Login() {

    const images = [
        LoginPageImage.src,
        LoginPageImage1.src,
        LoginPageImage2.src,
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            )
        }, 4000) 

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full flex min-h-screen">
            
            {/* LEFT */}
            <div className="w-full lg:w-[40%] flex justify-center items-center">
                <div className="w-full px-6 lg:px-20 flex flex-col gap-4">
                    
                    <div>
                        <h1 className="text-3xl text-primary font-bold">
                            Login
                        </h1>
                    </div>

                    <form>
                        <div className="flex flex-col gap-4">
                            
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <label className="text-primary">Email</label>
                                    <input
                                        type="email"
                                        className="bg-primary/20 text-primary rounded-md px-4 py-3 focus:outline-none focus:bg-primary/30 transition"
                                        placeholder="Enter Your E-Mail"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-primary">Password</label>
                                    <input
                                        type="password"
                                        className="bg-primary/20 text-primary rounded-md px-4 py-3 focus:outline-none focus:bg-primary/30 transition"
                                        placeholder="Enter Your Password"
                                    />
                                </div>

                                <div className="flex justify-between text-sm">
                                    <div className="flex gap-1 items-center">
                                        <input type="checkbox" />
                                        <label>Remember Me</label>
                                    </div>

                                    <a href="#" className="text-[#808080]">
                                        Forgot Password?
                                    </a>
                                </div>

                            </div>

                            <div>
                                <button className="bg-primary text-white font-semibold w-full px-4 py-3 rounded-md hover:opacity-90 transition">
                                    Login
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block lg:w-[60%] p-6">
                
                <div className="relative w-full h-full overflow-hidden rounded-xl">

                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Login Image"
                            className={`
                                absolute inset-0 w-full h-full object-fill
                                transition-opacity duration-1000 ease-in-out
                                ${index === currentIndex ? "opacity-100" : "opacity-0"}
                            `}
                        />
                    ))}

                </div>

            </div>

        </div>
    )
}