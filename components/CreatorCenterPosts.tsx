"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import {
    setArticleId,
    setEditFalse,
    setEditTrue,
} from "@/store/editStateSlice";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

const CreatorCenterPosts = () => {
    const [posts, setPosts] = useState<DocumentData | undefined>();
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const getData = async () => {
        let data: any = [];
        const docRef = query(
            collection(db, "articles"),
            where("userId", "==", user.userId)
        );

        const docSnap = await getDocs(docRef);
        // setPosts(docSnap.data()?.filter((article: any) => article.userId === user.userId));
        docSnap.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        setPosts(data);
    };

    useEffect(() => {
        if (user.user !== "") {
            getData();
        }
    }, []);

    const deletePost = async (postId: string) => {
        await deleteDoc(doc(db, "articles", postId));
        window.location.reload();
    };

    const handleOpen = (postId: string) => {
        router.push(`/blog/${postId}`);
    };

    const handleEdit = (postId: string) => {
        router.push("/creator-center/create-article");
        dispatch(setEditTrue());
        dispatch(setArticleId(postId));
    };

    const handleCreate = () => {
        router.push("/creator-center/create-article");
        dispatch(setEditFalse());
    };

    return (
        <div className="pt-[50px] pb-[80px] px-4 lg:px-[80px]">
            <div className="flex justify-between items-center max-[1024px]:flex-col">
                <div className="mb-[30px] col-span-4 flex flex-col items-start">
                    <h1 className="text-4xl pb-3">Creator center</h1>
                    <p className="text-[#83AF8F] text-xl text-start">
                        Latest articles from our creators
                    </p>
                </div>
                {user.user !== "" && posts && posts?.length !== 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCreate();
                        }}
                        className="text-white bg-black rounded-full shadow-lg py-3 px-5 border border-[#777] max-[1024px]:mb-4">
                        Create Article
                    </button>
                )}
            </div>
            {user.user !== "" ? (
                posts?.length !== 0 && posts ? (
                    <div className="flex flex-col gap-14">
                        {posts
                            .sort((a: any, b: any) => b.createdAt - a.createdAt)
                            .map((post: any) => (
                                <CreatorCenterCard
                                    key={post.id}
                                    postId={post.id}
                                    title={post.data.title}
                                    deletePost={deletePost}
                                    handleOpen={handleOpen}
                                    handleEdit={handleEdit}
                                    category={post.data.category}
                                    createdAt={post.createdAt
                                        .toDate()
                                        .toString()
                                        .split(" ")
                                        .slice(1, 4)
                                        .join(" ")}
                                />
                            ))}
                        {/* <BlogCard
                            title={"Nasdaq overview"}
                            category={"Capital market"}
                            createdAt={"16/04/2023"}
                        />
                        <BlogCard
                            title={"FED decision"}
                            category={"Market data"}
                            createdAt={"15/04/2023"}
                        />
                        <BlogCard
                            title={"OPEC decision to cut production"}
                            category={"Commodities"}
                            createdAt={"14/04/2023"}
                        /> */}
                    </div>
                ) : (
                    <EmptyPage
                        title="Creator center is empty"
                        subtitle="You don't create any article yet"
                        isLoggedIn={true}
                    />
                )
            ) : (
                <EmptyPage
                    title="You're not Logged in"
                    subtitle="To access the Creator center you need to Log in or create an acount"
                    isLoggedIn={false}
                />
            )}
        </div>
    );
};

const CreatorCenterCard = ({
    title,
    category,
    createdAt,
    postId,
    handleOpen,
    deletePost,
    handleEdit,
}: CreatorCenterCardType) => {
    return (
        <div className="h-[150px] relative">
            <div
                onClick={() => handleOpen(postId)}
                className="w-full h-full p-4 lg:p-10 absolute z-20 bg-[#FBF8F3] rounded-[10px] flex items-center justify-between cursor-pointer">
                <div className="lg:w-full flex max-[1024px]:flex-col max-[1024px]:gap-4 lg:items-center lg:justify-between">
                    <div className="lg:w-1/2 text-lg lg:text-2xl flex items-center capitalize overflow-scroll">
                        {title}
                    </div>
                    <div className="flex gap-4 lg:w-1/2 lg:justify-between lg:px-20">
                        <div>
                            <p className="text-[#777] text-[0.6rem] lg:text-[0.8rem]">
                                category
                            </p>
                            <p className="max-[1024px]:text-[0.8rem]">
                                {category}
                            </p>
                        </div>
                        <div>
                            <p className="text-[#777] text-[0.6rem] lg:text-[0.8rem]">
                                created at
                            </p>
                            <p className="max-[1024px]:text-[0.8rem]">
                                {createdAt}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex max-[1024px]:flex-col gap-6">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(postId);
                        }}
                        className="flex items-center justify-center w-[80px] border border-[#ccc] rounded-full py-2 px-5 z-30">
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePost(postId);
                        }}
                        className="flex items-center justify-center w-[80px] text-white bg-[#F84646] rounded-full py-2 px-5">
                        Delete
                    </button>
                </div>
            </div>
            <div className="w-2/5 h-full bg-[#6E6D6B] rounded-[10px] absolute top-[45px]"></div>
            <div className="w-3/4 h-full bg-[#9D9B98] rounded-[10px] absolute top-[30px]"></div>
            <div className="w-full h-full bg-[#CCCAC6] rounded-[10px] absolute top-[15px]"></div>
        </div>
    );
};

const EmptyPage = ({ title, subtitle, isLoggedIn }: EmptyPageType) => {
    return (
        <div className="flex flex-col gap-14 relative">
            <div className="h-[100px] lg:h-[150px]">
                <div className="w-full h-full p-4 lg:p-10 bg-[#eee] rounded-[10px] flex items-center justify-between">
                    <div className="w-1/2 flex items-center">
                        <div className="bg-[#D9D9D9] w-1/2 h-[40px] border"></div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[40px] w-[150px]"></div>
                    <div className="bg-[#D9D9D9] h-[40px] w-[150px]"></div>
                    <div className="flex gap-6 ml-12">
                        <button className="w-[80px] h-[40px] border border-[#ccc] p-2"></button>
                        <button className="w-[80px] h-[40px] bg-[#D9D9D9] p-2"></button>
                    </div>
                </div>
            </div>
            <div className="h-[100px] lg:h-[150px]">
                <div className="w-full h-full p-4 lg:p-10 bg-[#eee] rounded-[10px] flex items-center justify-between">
                    <div className="w-1/2 flex items-center">
                        <div className="bg-[#D9D9D9] w-1/2 h-[40px] border"></div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[40px] w-[150px]"></div>
                    <div className="bg-[#D9D9D9] h-[40px] w-[150px]"></div>
                    <div className="flex gap-6 ml-12">
                        <button className="w-[80px] h-[40px] border border-[#ccc] p-2"></button>
                        <button className="w-[80px] h-[40px] bg-[#D9D9D9] p-2"></button>
                    </div>
                </div>
            </div>
            <div className="h-[100px] lg:h-[150px]">
                <div className="w-full h-full p-4 lg:p-10 bg-[#eee] rounded-[10px] flex items-center justify-between">
                    <div className="w-1/2 flex items-center">
                        <div className="bg-[#D9D9D9] w-1/2 h-[40px] border"></div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[40px] w-[150px]"></div>
                    <div className="bg-[#D9D9D9] h-[40px] w-[150px]"></div>
                    <div className="flex gap-6 ml-12">
                        <button className="w-[80px] h-[40px] border border-[#ccc] p-2"></button>
                        <button className="w-[80px] h-[40px] bg-[#D9D9D9] p-2"></button>
                    </div>
                </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm lg:w-2/5 border border-[#ccc] h-[250px] lg:h-[300px] absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col items-center justify-center gap-3 px-8">
                <h1 className="text-2xl lg:text-3xl">{title}</h1>
                <h2 className="text-center lg:text-2xl">{subtitle}</h2>
                {isLoggedIn ? (
                    <Link href="/creator-center/create-article">
                        <button className="text-white bg-black rounded-full shadow-lg py-3 px-5 border border-[#777]">
                            Create Article
                        </button>
                    </Link>
                ) : (
                    <div className="flex items-center gap-3 mt-4">
                        <button className="flex items-center h-[40px] bg-[#000] text-white border border-[#777] shadow-lg rounded-full py-2 px-5">
                            <Link
                                href={{
                                    pathname: "/login",
                                    query: { mode: "create" },
                                }}>
                                <p>Sign up</p>
                            </Link>
                        </button>
                        <button className="flex items-center h-[40px] bg-[#FBF8F3] text-[#000] border border-[#777] shadow-lg rounded-full py-2 px-5">
                            <Link
                                href={{
                                    pathname: "/login",
                                    query: { mode: "login" },
                                }}>
                                <p>Log in</p>
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorCenterPosts;
