"use client";
import React, { useState } from "react";
import CreateArticleButtons from "./CreateArticleButtons";
import { AiFillCaretDown } from "react-icons/ai";
import EditorText from "./Editor";

const CATEGORIES = [
    "USA economy",
    "Global economy",
    "Stocks",
    "Currencies",
    "Cryptocurrencies",
    "Commodities",
    "Calendar",
];

const CreateArticleStepTwo = ({
    currentStepIndex,
    next,
    back,
    title,
    category,
    description,
    article,
    updateFields,
}: StepsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <form className="h-[calc(100%-60px)] lg:h-4/5 w-[100%] flex max-[1024px]:flex-col max-[1024px]:overflow-scroll max-[1024px]:pt-4 max-[1024px]:pb-10">
            <div className="lg:w-1/2 flex flex-col justify-between lg:p-8 lg:pl-0 max-[1024px]:mb-6">
                <div className="flex flex-col gap-2 lg:gap-4 max-[1024px]:mb-4">
                    <label>Title</label>
                    <input
                        className="bg-white/10 rounded-full border border-[#777] outline-none p-3"
                        type="text"
                        value={title}
                        required
                        onChange={(e) =>
                            updateFields({ title: e.target.value })
                        }
                    />
                </div>
                {/* <div className="flex flex-col gap-4">
                    <label>Category</label>
                    <input
                    className="bg-white/10 rounded-full border border-[#777] outline-none p-3"
                    type="text"
                    value={category}
                    required
                    onChange={(e) =>
                        updateFields({ category: e.target.value })
                    }
                    />
                </div> */}
                <div
                    className="flex flex-col gap-2 lg:gap-4 max-[1024px]:mb-4 relative"
                    onBlur={() => setIsOpen(false)}
                    tabIndex={0}>
                    <label>Category</label>
                    <div
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex items-center justify-between pr-6 cursor-pointer h-[50px] bg-white/10 rounded-full border border-[#777] p-3">
                        {category}
                        <AiFillCaretDown />
                    </div>
                    {isOpen && (
                        <ul className="absolute top-[105%] w-full rounded-[15px] border border-[#777] bg-[#2C373E] z-30">
                            {CATEGORIES.map((category) => (
                                <li
                                    key={category}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateFields({
                                            category: category,
                                        });
                                        // handlePick(category);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-[#323E44] cursor-pointer rounded-[15px]">
                                    {category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex flex-col gap-2 lg:gap-4">
                    <label>Short description</label>
                    <input
                        className="bg-white/10 rounded-full border border-[#777] outline-none p-3"
                        type="text"
                        value={description}
                        onChange={(e) =>
                            updateFields({ description: e.target.value })
                        }
                    />
                </div>
                <div className="max-[1024px]:hidden">
                    <CreateArticleButtons
                        currentStepIndex={currentStepIndex}
                        next={next}
                        back={back}
                    />
                </div>
            </div>
            <div className="max-[1024px]:hidden w-[1px] bg-white h-[100%]" />
            <div className="lg:w-1/2 h-[100%] max-[1024px]:mb-2 lg:pl-[30px]">
                {/* <textarea
                    placeholder="Your article here. Check ? to see hint"
                    required
                    onChange={(e) => updateFields({ article: e.target.value })}
                    value={article}
                className="w-full h-full bg-white/10 rounded-[10px] border border-[#777] outline-none p-6"></textarea> */}
                <EditorText updateFields={updateFields} article={article} />
            </div>
            <div className="lg:hidden pt-2">
                <CreateArticleButtons
                    currentStepIndex={currentStepIndex}
                    next={next}
                    back={back}
                />
            </div>
        </form>
    );
};

export default CreateArticleStepTwo;
