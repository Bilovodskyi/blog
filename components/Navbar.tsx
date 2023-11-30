"use client";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { setUser, setUserId } from "@/store/userSlice";
import { auth } from "@/firebase/firebase";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

const Navbar = () => {
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user.user !== null && user.user !== "") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user]);

    const handleLogout = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setUser(""));
        dispatch(setUserId(""));
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            dispatch(setUser(""));
            dispatch(setUserId(""));
        }
    });

    return (
        <div className="flex bg-[#152128]/60 backdrop-blur-sm gap-2 md:gap-6 justify-center items-center w-full h-[60px] fixed top-0 z-50 max-[768px]:pt-4">
            <Link href="/">
                <p className="text-white">Home</p>
            </Link>

            <div className="h-1/2 w-[1px] bg-white" />
            <Link href="/blog">
                <p className="text-white">Blog</p>
            </Link>
            <div className="h-1/2 w-[1px] bg-white" />

            <Link href="/creator-center">
                <p className="text-white whitespace-nowrap">Creator center</p>
            </Link>
            <div className="h-1/2 w-[1px] bg-white" />

            {/* <Link href="/login">
                <p className="text-white">Account</p>
            </Link> */}
            {!isLoggedIn ? (
                <>
                    <div className="max-[768px]:hidden flex items-center gap-3">
                        <button className="flex items-center h-[40px] bg-[#000] text-white border border-[#777] hover:bg-zinc-900 shadow-lg rounded-full py-2 px-5">
                            <Link
                                href={{
                                    pathname: "/login",
                                    query: { mode: "create" },
                                }}>
                                <p>Sign up</p>
                            </Link>
                        </button>
                        <button className="flex items-center h-[40px] bg-[#FBF8F3] text-[#000] border border-[#777] hover:bg-stone-300 shadow-lg rounded-full py-2 px-5">
                            <Link
                                href={{
                                    pathname: "/login",
                                    query: { mode: "login" },
                                }}>
                                <p>Log in</p>
                            </Link>
                        </button>
                    </div>
                    <div className="md:hidden">
                        <Link
                            href={{
                                pathname: "/login",
                                query: { mode: "login" },
                            }}>
                            <h1 className="text-white">Log in</h1>
                        </Link>
                    </div>
                </>
            ) : (
                <div
                    className="flex items-center gap-2 cursor-pointer relative"
                    onClick={() => setToggleDropdown((prev) => !prev)}>
                    <p className="text-white capitalize">{user.user}</p>
                    <div className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px] rounded-full border border-white bg-[#FBF8F3] flex items-center justify-center uppercase lg:text-2xl">
                        {user.user![0]}
                    </div>
                    {toggleDropdown && (
                        <div className="w-[100px] lg:w-[150px] h-[100px] flex items-center justify-center absolute left-[-10px] lg:left-[-25px] top-[40px] lg:top-[50px] bg-[#152128]/60 text-white">
                            <button
                                onClick={handleLogout}
                                className="h-[40px] text-white bg-[#F84646] rounded-[10px] py-2 px-4">
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
