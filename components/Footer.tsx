"use client";

import { usePathname } from "next/navigation";
import { IoTriangleSharp } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/login") return null;
    return (
        <div className="dots-background text-white p-10">
            <div className="flex max-[768px]:flex-col max-[768px]:gap-4">
                <div className="md:w-1/4">
                    <div className="flex flex-col gap-2">
                        <h1>About</h1>
                        <p className="text-[0.75rem] text-gray-300 pr-8">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Inventore fuga dicta nemo harum alias
                            repellat, odio quos dolor qui, sed tempore? Sequi
                            alias atque cumque?
                        </p>
                    </div>
                </div>
                <div className="md:w-1/4 flex flex-col gap-2">
                    <h1>Navigation</h1>
                    <ul className="text-[0.75rem] text-gray-300">
                        <li className="hover:text-white cursor-pointer">
                            Home
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            Blog
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            Creator center
                        </li>
                    </ul>
                </div>
                <div className="md:w-1/4 flex flex-col gap-2">
                    <h1>Contact</h1>
                    <div>
                        <p className="text-[0.75rem] text-gray-300">
                            Address: 1778 Some st.
                        </p>
                        <p className="text-[0.75rem] text-gray-300">Phone:</p>
                        <p className="text-[0.75rem] text-gray-300">
                            Adress: 1778 Some st.
                        </p>
                    </div>
                </div>
                <div className="md:w-1/4 flex flex-col gap-2">
                    <h1>Social Media</h1>
                    <div className="flex max-[768px]:justify-around text-[1.5rem] items-center gap-4 text-gray-300 cursor-pointer">
                        <LuInstagram />
                        <FaLinkedinIn />
                        <FaFacebook />
                        <FaYoutube />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center text-[1.5rem] gap-3 py-4 border-b-[0.5px] border-gray-500">
                <IoTriangleSharp style={{ fontSize: "2rem" }} />
                Economist
            </div>
            <div>
                <p className="text-[0.75rem] text-gray-400 text-center mt-2">
                    Copyright 2023 All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
