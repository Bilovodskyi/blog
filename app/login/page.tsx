"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth, db, googleProvider } from "@/firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser, setUserId } from "@/store/userSlice";
import { AppDispatch } from "@/store";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SiTesla } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { SiNvidia } from "react-icons/si";
import { RiNetflixFill } from "react-icons/ri";
import { SiIbm } from "react-icons/si";
import { SiGeneralelectric } from "react-icons/si";

export const useAppDispatch: () => AppDispatch = useDispatch;

const Login = () => {
    const [createAccountMode, setCreateAccountMode] = useState(false);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const router = useRouter();

    const dispatch = useAppDispatch();

    let pathname = searchParams.get("mode");

    useEffect(() => {
        if (pathname === "create") {
            setCreateAccountMode(true);
        } else {
            setCreateAccountMode(false);
        }
    }, [pathname]);

    useEffect(() => {
        pathname = "";
    }, [createAccountMode]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const docRef = doc(db, "users", res.user.uid);
            const docSnap = await getDoc(docRef);
            dispatch(setUser(docSnap.data()?.userName));
            dispatch(setUserId(docSnap.id));
            router.back();
        } catch (error) {
            // setError(true);

            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleCreateAccount = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(db, "users", res.user.uid), {
                userName,
                email,
                password,
            });
            dispatch(setUser(userName));
            dispatch(setUserId(res.user.uid));
            router.back();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleLoginWithGoogle = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider).then((result) => {
                const user = result.user;
                dispatch(setUser(result.user.displayName!));
                dispatch(setUserId(result.user.uid));
                router.back();
                console.log(user);
            });
        } catch (error) {
            // setError(true);
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="dots-background h-screen flex flex-col items-center justify-center gap-4 max-[1024px]:p-4">
            <StyleCard style="bg-[#FAB84C] w-[60px] md:w-[80px] lg:w-[120px] h-[60px] md:h-[80px] lg:h-[120px] top-[225px] left-[50px] lg:left-[200px] xl:left-[300px]">
                <SiTesla
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#FAB84C] w-[60px] md:w-[80px] lg:w-[120px] h-[60px] md:h-[80px] lg:h-[120px] top-[150px] right-[75px]">
                <FaApple
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#ECEFAF] w-[60px] md:w-[80px] lg:w-[120px] h-[60px] md:h-[80px] lg:h-[120px] bottom-[250px] md:bottom-[150px] left-[100px]">
                <FaAmazon
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#FBF8F3] w-[60px] md:w-[80px] lg:w-[120px] h-[60px] md:h-[80px] lg:h-[120px] bottom-[75px] right-[50px] md:right-[150px]">
                <FaGoogle
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#83AF8F] w-[50px] md:w-[70px] lg:w-[90px] w-[50px] md:h-[70px] lg:h-[90px] bottom-[225px] right-[100px] lg:right-[200px] xl:right-[350px]">
                <FaMicrosoft
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#FAB84C] w-[50px] md:w-[70px] lg:w-[90px] h-[50px] md:h-[70px] lg:h-[90px] bottom-[75px] left-[50px] lg:left-[300px] xl:left-[450px]">
                <SiGeneralelectric
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#FBF8F3] w-[50px] md:w-[70px] lg:w-[90px] w-[50px] md:h-[70px] lg:h-[90px] top-[75px] xl:top-[175px] right-[75px] lg:right-[200px] xl:right-[300px]">
                <SiNvidia
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#83AF8F] w-[40px] lg:w-[80px] h-[40px] lg:h-[80px] bottom-[5px] left-[200px] xl:left-[300px]">
                <RiNetflixFill
                    style={{ color: "#152128", width: "60%", height: "60%" }}
                />
            </StyleCard>
            <StyleCard style="bg-[#FBF8F3] w-[40px] lg:w-[80px] h-[40px] lg:h-[80px] top-[100px] left-[75px] lg:left-[150px]">
                <SiIbm
                    style={{
                        color: "#152128",
                        width: "60%",
                        height: "60%",
                    }}
                />
            </StyleCard>
            {createAccountMode ? (
                <>
                    <div className="w-full md:w-[425px] h-[500px] z-10 py-12 px-8 flex flex-col gap-8">
                        <h1 className="text-3xl text-white text-center">
                            Create Account
                        </h1>
                        <form
                            onSubmit={handleCreateAccount}
                            className="flex flex-col gap-10">
                            <div className="flex flex-col gap-10 relative">
                                {error && (
                                    <p className="absolute top-[-30px] right-0 text-[#F84646]">
                                        {error?.substring(
                                            error?.indexOf("/") + 1,
                                            error?.indexOf(")")
                                        )}
                                    </p>
                                )}
                                <input
                                    type="text"
                                    className="h-[50px] text-white border-[0.5px] border-gray-500 outline-none px-6 bg-black rounded-[5px]"
                                    placeholder="Username"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                                <input
                                    type="email"
                                    className="h-[50px] text-white border-[0.5px] border-gray-500 outline-none px-6 bg-black rounded-[5px]"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="h-[50px] text-white border-[0.5px] border-gray-500 outline-none px-6 bg-black rounded-[5px]"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="text-white hover:text-gray-400"
                                    type="button"
                                    onClick={() => {
                                        setCreateAccountMode(false);
                                        setError(null);
                                        setUserName("");
                                        setEmail("");
                                        setPassword("");
                                    }}>
                                    Back to Log in
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center h-[40px] bg-[#000] text-white border border-[#777] shadow-lg rounded-full py-2 px-5 hover:bg-zinc-900">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full md:w-[425px] z-10 px-8 flex flex-col gap-8">
                        <h1 className="text-4xl text-center text-white">
                            Log in
                        </h1>
                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col gap-10">
                            <div className="relative flex flex-col gap-10">
                                {error && (
                                    <p className="absolute top-[-30px] right-0 text-[#F84646]">
                                        {error?.substring(
                                            error?.indexOf("/") + 1,
                                            error?.indexOf(")")
                                        )}
                                    </p>
                                )}
                                <input
                                    type="email"
                                    className="h-[50px] text-white border-[0.5px] border-gray-500 outline-none px-6 bg-black rounded-[5px]"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="h-[50px] text-white border-[0.5px] border-gray-500 outline-none px-6 bg-black rounded-[5px]"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="text-white  hover:text-gray-400"
                                    type="button"
                                    onClick={() => {
                                        setCreateAccountMode(true);
                                        setError(null);
                                        setEmail("");
                                        setPassword("");
                                    }}>
                                    Create Account
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center h-[40px] bg-[#000] text-white border border-[#777] shadow-lg rounded-full py-2 px-5 hover:bg-zinc-900">
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>

                    <h1 className="text-[0.8rem] text-white">or Log in with</h1>
                    <div className="w-full md:w-[425px] px-8">
                        <div
                            className="h-[50px] border-[0.5px] border-gray-500 z-10 rounded-[10px] bg-black flex items-center justify-center gap-4 hover:cursor-pointer hover:bg-zinc-900"
                            onClick={handleLoginWithGoogle}>
                            <Image
                                src={"/GOOG.png"}
                                width={30}
                                height={30}
                                alt="google logo"
                            />
                            <h1 className="text-[1.25rem] text-white">
                                Google
                            </h1>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

type StyleCardType = {
    style: string;
    children: ReactNode;
};

const StyleCard = ({ style, children }: StyleCardType) => {
    return (
        <div
            className={`${style} max-[768px]:hidden border-[0.5px] border-gray-500 rounded-[5px] absolute flex items-center justify-center`}>
            {children}
        </div>
    );
};
export default Login;
