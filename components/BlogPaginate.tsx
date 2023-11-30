import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import BlogCard from "./BlogCard";
import LoadingCard from "./LoadingCard";

const styles = [
    {
        column: "col-span-2",
        row: "row-span-2",
        isImage: true,
    },
    {
        column: "col-span-2",
        row: "row-span-1",
        isImage: false,
    },
    {
        column: "col-span-2",
        row: "row-span-1",
        isImage: false,
    },
    {
        column: "col-span-4",
        row: "row-span-2",
        isImage: true,
    },
    {
        column: "col-span-2",
        row: "row-span-2",
        isImage: true,
    },
    {
        column: "col-span-2",
        row: "row-span-2",
        isImage: true,
    },
];

const BlogPaginate = ({
    itemsPerPage,
    data,
    currentPage,
    setCurrentPage,
    isMobile,
}: BlogPaginateType) => {
    const router = useRouter();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    const pageCount = Math.ceil(data?.length / itemsPerPage);

    const handleOpen = (postId: string) => {
        router.push(`/blog/${postId}`);
    };

    const paginate = (e: any, value: any): void => {
        setCurrentPage(value);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="md:grid grid-cols-4 grid-rows-[repeat(6,200px)] gap-y-6 gap-x-6">
                {currentItems
                    ? currentItems
                          .sort((a: any, b: any) => b.createdAt - a.createdAt)
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
            </div>
            <div className="w-full flex justify-center">
                <Pagination
                    count={pageCount}
                    onChange={paginate}
                    page={currentPage}
                />
            </div>
        </>
    );
};

export default BlogPaginate;
