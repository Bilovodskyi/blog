"use client";
import { db } from "@/firebase/firebase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Article = async ({ params }: { params: { articleId: string } }) => {
    const router = useRouter();

    const getData = async () => {
        const docRef = doc(db, "articles", params.articleId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    };
    const data = await getData();

    return (
        <>
            <div className="h-[300px] md:h-[450px] overflow-hidden">
                {data?.data.image ? (
                    <Image
                        src={data.data.image}
                        width={1440}
                        height={500}
                        alt="uploaded image"
                        className="object-cover h-[100%]"
                    />
                ) : (
                    <Image
                        src="/article-default-image.jpeg"
                        width={1440}
                        height={300}
                        alt="default image"
                        className="object-cover h-[100%]"
                    />
                )}
                <button
                    className="absolute top-[100px] left-[40px] text-white text-[1.2rem] bg-black/40 px-6 py-4"
                    onClick={() => router.back()}>
                    Back
                </button>
            </div>
            <div className="text-white px-6 md:px-14 pt-4 md:pt-10">
                <div className="flex items-end gap-4">
                    <p className="text-[#777] text-[0.75rem]">creator</p>
                    {data?.userName ? (
                        <p className="capitalize">{data?.userName}</p>
                    ) : (
                        <p>Creator unknown</p>
                    )}
                </div>
                <div className="flex items-end gap-4">
                    <p className="text-[#777] text-[0.75rem]">created at</p>
                    <p>
                        {data?.createdAt
                            .toDate()
                            .toString()
                            .split(" ")
                            .slice(1, 4)
                            .join(" ")}
                    </p>
                </div>
            </div>
            <div className="py-12 md:py-6">
                <h1 className="text-center capitalize text-3xl md:text-[3rem] text-white">
                    {data?.data.title}
                </h1>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: data?.data.article }}
                className="ProseMirror flex flex-col gap-4 text-white p-4 md:p-14 md:pt-0 leading-loose tracking-wide"></div>
        </>
    );
};

export default Article;
