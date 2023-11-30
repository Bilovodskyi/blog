import React from "react";
import CreateArticleButtons from "./CreateArticleButtons";
import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";

const CreateArticleStepThree = ({
    currentStepIndex,
    article,
    image,
    title,
    next,
    back,
    create,
    isEdit,
}: Partial<StepsProps> & CreateArticleType) => {
    return (
        <div className="w-[100%] h-[calc(100%-60px)] lg:h-4/5 flex max-[1024px]:flex-col">
            <div className="lg:w-1/2 flex flex-col justify-between lg:p-8 pl-0">
                <div className="h-full flex items-center justify-center">
                    <div className="w-[200px] h-[200px] flex flex-col items-center justify-center gap-4">
                        <FaRegCheckCircle className="text-[8rem] text-lime-300" />
                        <h1 className="text-3xl text-lime-300">Done!</h1>
                    </div>
                </div>
                <div className="max-[1024px]:hidden">
                    <CreateArticleButtons
                        currentStepIndex={currentStepIndex}
                        next={next}
                        back={back}
                        create={create}
                        isEdit={isEdit}
                    />
                </div>
            </div>
            <div className="max-[1024px]:hidden w-[1px] bg-white h-[100%]" />
            <div className="lg:w-1/2 h-[100%] lg:pl-[30px] overflow-scroll max-[1024px]:mb-2">
                {/* <textarea className="w-full h-full bg-white/10 rounded-[10px] border border-[#777] outline-none p-6"></textarea> */}
                <div className="h-[205px] overflow-hidden flex items-center justify-center">
                    {image ? (
                        <Image
                            src={image}
                            width={610}
                            height={205}
                            alt="uploaded image"
                        />
                    ) : (
                        <Image
                            src="/article-default-image.jpeg"
                            width={610}
                            height={205}
                            alt="default image"
                        />
                    )}
                </div>
                <h1 className="text-center capitalize text-[1.5rem] text-white p-2">
                    {title}
                </h1>
                <div
                    dangerouslySetInnerHTML={{ __html: article! }}
                    className="ProseMirror flex flex-col gap-4"></div>
            </div>
            <div className="lg:hidden pb-10">
                <CreateArticleButtons
                    currentStepIndex={currentStepIndex}
                    next={next}
                    back={back}
                    create={create}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
};

export default CreateArticleStepThree;
