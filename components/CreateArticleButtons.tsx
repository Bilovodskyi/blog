import Link from "next/link";
import React from "react";

const CreateArticleButtons = ({
    currentStepIndex,
    next,
    back,
    create,
    isEdit,
}: Partial<StepsProps> & Partial<CreateArticleType>) => {
    return (
        <div className="flex justify-end gap-4">
            {currentStepIndex === 0 ? (
                <Link
                    href="/creator-center"
                    className="flex items-center h-[40px] bg-[#000] border border-[#777] shadow-lg rounded-full py-2 px-5">
                    Close
                </Link>
            ) : (
                <button
                    onClick={back}
                    className="flex items-center h-[40px] bg-[#000] border border-[#777] shadow-lg rounded-full py-2 px-5">
                    Back
                </button>
            )}
            {currentStepIndex === 2 ? (
                <button
                    className="flex items-center h-[40px] bg-[#FBF8F3] text-[#000] border border-[#777] shadow-lg rounded-full py-2 px-5"
                    onClick={create}>
                    {isEdit ? "Edit" : "Create"}
                </button>
            ) : (
                <button
                    onClick={next}
                    className="flex items-center h-[40px] bg-[#FBF8F3] text-[#000] border border-[#777] shadow-lg rounded-full py-2 px-5">
                    Next
                </button>
            )}
        </div>
    );
};

export default CreateArticleButtons;
