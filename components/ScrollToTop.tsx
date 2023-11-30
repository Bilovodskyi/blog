"use client";
import React, { useState } from "react";
import { FiChevronsUp } from "react-icons/fi";

const ScrollToTop = () => {
    const [toTopButton, setToTopButton] = useState(false);

    function handleScroll() {
        if (window.scrollY >= 150) {
            setToTopButton(true);
        } else {
            setToTopButton(false);
        }
    }

    function goToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    window.addEventListener("scroll", handleScroll);
    return (
        <>
            {toTopButton && (
                <div
                    onClick={goToTop}
                    className="h-[60px] w-[60px] backdrop-blur-sm bg-gray-300/30 fixed bottom-6 right-6 shadow-md rounded-[10px] z-40 cursor-pointer flex items-center justify-center">
                    <FiChevronsUp className="text-4xl" />
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
