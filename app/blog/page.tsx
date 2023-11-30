"use client";
import BlogPaginate from "@/components/BlogPaginate";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";

const Blog = () => {
    const [category, setCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [data, setData] = useState<DocumentData>();
    const [filteredArticles, setFilteredArticles] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    const getData = async () => {
        let newData: any = [];
        const querySnapshot = await getDocs(collection(db, "articles"));
        // setPosts(docSnap.data()?.filter((article: any) => article.userId === user.userId));
        querySnapshot.forEach((doc) => {
            newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
    };

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        getData();
        handleResize();
        window.addEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setFilteredArticles(
            data?.filter((article: any) => {
                // if (search == "" && category == "all") return data;
                if (search !== "")
                    return (
                        article.data.category
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        article.data.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    );
                return (
                    article.data.category.toLowerCase() ==
                    category.toLowerCase()
                );
            })
        );
        setCurrentPage(1);
    }, [search, category]);

    return (
        <div className="pt-[60px] pb-[80px] px-4 lg:px-[80px] bg-white">
            <div className="flex flex-col items-center justify-center mb-[20px] lg:mb-[50px] md:pt-8 gap-8">
                <h1 className="text-6xl w-[380px] md:w-[800px] text-center">
                    <span
                        className="bg-gradient-to-r from-emerald-500 via-sky-500 to-orange-400"
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        Search
                    </span>{" "}
                    for article by typing article title or category
                </h1>
                <div className="flex items-center justify-between w-full lg:w-[500px] h-[40px] border border-[#777] shadow-lg rounded-full px-4">
                    <input
                        className="outline-none text-[.9rem] w-full"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {search !== "" && (
                        <button onClick={() => setSearch("")}>&times;</button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-10 mb-10">
                <div className="grid grid-cols-2 grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 xl:flex gap-6">
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"all"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"usa economy"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"global economy"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"stocks"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"currencies"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"cryptocurrencies"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"commodities"}
                    />
                    <CategoryButton
                        setCategory={setCategory}
                        category={category}
                        filter={"calendar"}
                    />
                </div>
            </div>
            <div className="mb-[30px] col-span-4">
                <h1 className="text-4xl font-semibold">Blog</h1>
                <p className="text-[#83AF8F]">
                    Shown articles in &quot;{category}&quot; category
                </p>
            </div>
            <div className="flex flex-col gap-24">
                <BlogPaginate
                    itemsPerPage={6}
                    data={
                        search == "" && category == "all"
                            ? data
                            : filteredArticles
                    }
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
};

type CategoryButtonProps = {
    setCategory: (str: string) => void;
    category: string;
    filter: string;
};

const CategoryButton = ({
    setCategory,
    category,
    filter,
}: CategoryButtonProps) => {
    return (
        <div
            className="h-[40px] flex-1 relative col-span-1 cursor-pointer"
            onClick={() => setCategory(filter)}>
            {category === filter ? (
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                    <h1 className="capitalize">{filter}</h1>
                </div>
            ) : (
                <>
                    <div className="w-full h-full bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                        <h1 className="capitalize">{filter}</h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default Blog;
