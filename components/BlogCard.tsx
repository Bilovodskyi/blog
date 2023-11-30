import Image from "next/image";
import React from "react";

const BlogCard = ({
    article,
    styles,
    index,
    handleOpen,
    isMobile,
}: BlogCardType) => {
    let styleNumber = index;
    let multiplier = Math.floor(styleNumber / styles.length);
    if (styleNumber >= styles.length) {
        styleNumber = styleNumber - styles.length * multiplier;
    }

    return (
        <div
            onClick={() => handleOpen(article.id)}
            className={`cursor-pointer max-[768px]:h-[400px] mb-6 ${
                !isMobile &&
                `${styles[styleNumber].column} ${styles[styleNumber].row}`
            }`}>
            {(isMobile ? true : styles[styleNumber].isImage) ? (
                article.data.image ? (
                    <div
                        className={`${
                            !isMobile && "news-card"
                        } overflow-hidden h-full rounded-[10px] border shadow-lg p-2`}>
                        <Image
                            src={article.data.image}
                            alt="custom image"
                            height={300}
                            width={1440}
                            className="news-card-image object-cover h-[50%] md:h-[80%] rounded-[10px] border border-[#000]"
                        />
                        <div className="md:h-[20%] p-2 flex justify-between mt-2">
                            <h1 className="capitalize max-w-[75%] max-[768px]:font-semibold">
                                {article.data.title}
                            </h1>
                            <div className="news-card-date flex items-center md:items-end">
                                <p className="text-[.75rem] text-[#777]">
                                    {article.createdAt
                                        .toDate()
                                        .toString()
                                        .split(" ")
                                        .slice(1, 4)
                                        .join(" ")}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between md:h-[80%]">
                            <h2 className="mt-4 p-2">
                                {isMobile ? (
                                    article.data.description.length > 100 ? (
                                        <p>
                                            {article.data.description.substring(
                                                0,
                                                100
                                            )}
                                            ...{" "}
                                            <span className="text-cyan-700">
                                                read more
                                            </span>
                                        </p>
                                    ) : (
                                        <p>{article.data.description}</p>
                                    )
                                ) : (
                                    article.data.description
                                )}
                            </h2>
                            <p className="max-[768px]:hidden text-[.75rem] text-[#777] p-2 text-end">
                                {article.createdAt
                                    .toDate()
                                    .toString()
                                    .split(" ")
                                    .slice(1, 4)
                                    .join(" ")}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`${
                            !isMobile && "news-card "
                        } overflow-hidden h-full rounded-[10px] shadow-lg p-2`}>
                        <Image
                            src="/article-default-image.jpeg"
                            alt="custom image"
                            height={300}
                            width={1440}
                            className="news-card-image h-[50%] md:h-[80%] object-cover rounded-[10px] border border-[#000]"
                        />
                        <div className="md:h-[20%] p-2 flex justify-between mt-2">
                            <h1 className="capitalize max-w-[75%] max-[768px]:font-semibold">
                                {article.data.title}
                            </h1>
                            <div className="news-card-date flex items-center md:items-end">
                                <p className="text-[.75rem] text-[#777]">
                                    {article.createdAt
                                        .toDate()
                                        .toString()
                                        .split(" ")
                                        .slice(1, 4)
                                        .join(" ")}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between md:h-[80%]">
                            <h2 className="mt-4 p-2">
                                {isMobile ? (
                                    article.data.description.length > 100 ? (
                                        <p>
                                            {article.data.description.substring(
                                                0,
                                                100
                                            )}
                                            ...{" "}
                                            <span className="text-cyan-700">
                                                read more
                                            </span>
                                        </p>
                                    ) : (
                                        <p>{article.data.description}</p>
                                    )
                                ) : (
                                    article.data.description
                                )}
                            </h2>
                            <p className="max-[768px]:hidden text-[.75rem] text-[#777] p-2 text-end">
                                {article.createdAt
                                    .toDate()
                                    .toString()
                                    .split(" ")
                                    .slice(1, 4)
                                    .join(" ")}
                            </p>
                        </div>
                    </div>
                )
            ) : (
                <div className="h-full flex flex-col justify-between shadow-lg rounded-[10px] px-6">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-semibold text-xl text-center capitalize">
                            {article.data.title}
                        </h1>
                        {article.data.description.length > 200 ? (
                            <p>
                                {article.data.description.substring(0, 200)}
                                ...{" "}
                                <span className="text-cyan-700">read more</span>
                            </p>
                        ) : (
                            <p>{article.data.description}</p>
                        )}
                    </div>
                    <div className="h-[20%] p-2 pb-4 flex justify-end">
                        <div className="flex items-end">
                            <p className="text-[.75rem] text-[#777]">
                                {article.createdAt
                                    .toDate()
                                    .toString()
                                    .split(" ")
                                    .slice(1, 4)
                                    .join(" ")}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default BlogCard;
