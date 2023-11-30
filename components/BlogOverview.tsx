"use client";
import { db } from "@/firebase/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import LoadingCard from "./LoadingCard";

const styles = [
    {
        column: "col-span-2",
        row: "row-span-4",
        isImage: true,
    },
    {
        column: "col-span-2",
        row: "row-span-2",
        isImage: false,
    },
    {
        column: "col-span-2",
        row: "row-span-2",
        isImage: false,
    },
    {
        column: "col-span-4",
        row: "row-span-4",
        isImage: true,
    },
    {
        column: "col-span-2",
        row: "row-span-4",
        isImage: true,
    },
    {
        column: "col-span-2",
        row: "row-span-4",
        isImage: true,
    },
];

const BlogOverview = () => {
    const [data, setData] = useState<DocumentData>();

    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
    }, []);

    const getData = async () => {
        let newData: any = [];
        const querySnapshot = await getDocs(collection(db, "articles"));
        // setPosts(docSnap.data()?.filter((article: any) => article.userId === user.userId));
        querySnapshot.forEach((doc) => {
            newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleOpen = (postId: string) => {
        router.push(`/blog/${postId}`);
    };

    return (
        <div className="py-6 lg:py-[50px] px-4 lg:px-[80px] mb-[30px]">
            <div className="mb-[30px] col-span-4">
                <h1 className="text-4xl pb-3 font-semibold">Blog</h1>
                <p className="text-[#83AF8F] text-xl">
                    Latest articles from our creators
                </p>
            </div>
            <div className="md:grid grid-cols-4 grid-rows-[repeat(13,100px)] gap-y-3 gap-x-3">
                {data
                    ? data
                          ?.sort((a: any, b: any) => b.createdAt - a.createdAt)
                          .slice(0, 6)
                          .map((article: any, index: any) => (
                              <BlogCard
                                  article={article}
                                  handleOpen={handleOpen}
                                  styles={styles}
                                  index={index}
                                  key={index}
                                  isMobile={isMobile}
                              />
                          ))
                    : styles.map((x, index) => (
                          <LoadingCard
                              styles={styles}
                              index={index}
                              key={index}
                              isMobile={isMobile}
                          />
                      ))}
                <Link
                    href="/blog"
                    className="col-span-4 row-span-1 rounded-[10px] shadow-lg p-2 flex items-center justify-center cursor-pointer">
                    <h1 className="text-xl md:text-2xl">
                        Look for all articles
                    </h1>
                    <FiArrowUpRight className="text-xl md:text-2xl" />
                </Link>
            </div>
        </div>
    );
};

export default BlogOverview;
