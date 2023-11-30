"use client";
import CreateArticleStepOne from "@/components/CreateArticleStepOne";
import CreateArticleStepThree from "@/components/CreateArticleStepThree";
import CreateArticleStepTwo from "@/components/CreateArticleStepTwo";
import { db } from "@/firebase/firebase";
import { RootState } from "@/store";
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const INITIAL_DATA: InitialDataType = {
    image: "",
    title: "",
    category: "",
    description: "",
    article: "",
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const CreateArticle = () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [editedData, setEditedData] = useState<DocumentData>();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const userId = useAppSelector((state) => state.user.userId);
    const userName = useAppSelector((state) => state.user.user);
    const isEdit = useAppSelector((state) => state.edit.isEdit);
    const articleId = useAppSelector((state) => state.edit.articleId);

    const router = useRouter();

    const getData = async () => {
        const docRef = doc(db, "articles", articleId!);
        const docSnap = await getDoc(docRef);
        setEditedData(docSnap.data());
    };

    function updateFields(fields: Partial<InitialDataType>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    function next() {
        setCurrentStepIndex((i) => {
            if (i >= 2) return i;
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    async function createArticle(e: FormEvent) {
        e.preventDefault();
        await addDoc(collection(db, "articles"), {
            data,
            createdAt: new Date(),
            userId,
            userName,
        });
        router.push("/creator-center");
    }

    async function updateArticle(e: FormEvent) {
        e.preventDefault();
        const docRef = doc(db, "articles", articleId!);
        await updateDoc(docRef, {
            data,
        });
        router.push("/creator-center");
    }

    if (!userId && userId === "") {
        router.back();
    }

    useEffect(() => {
        isEdit && getData();
    }, []);

    useEffect(() => {
        editedData &&
            setData({
                image: editedData.data.image,
                title: editedData.data.title,
                category: editedData.data.category,
                description: editedData.data.description,
                article: editedData.data.article,
            });
    }, [editedData]);

    return (
        <div className="py-[20px] px-4 lg:px-[80px] h-screen text-white">
            <div className="flex items-center justify-center mb-[20px]">
                <div
                    className="w-full h-[60px] lg:h-[120px]
                     bg-white/10 rounded-[10px] flex items-center justify-center gap-2 lg:gap-6">
                    <h1 className="max-[1024px]:hidden text-xl mr-14">
                        Create new article
                    </h1>
                    <div className="flex gap-2 lg:gap-4 items-center">
                        <div
                            className={`border border-[#777] rounded-[5px] lg:rounded-[10px] w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] flex items-center justify-center ${
                                currentStepIndex !== 0 && "text-[#777]"
                            } max-[1024px]:text-[0.7rem]`}>
                            1
                        </div>
                        <h2
                            className={`${
                                currentStepIndex !== 0 && "text-[#777]"
                            } max-[1024px]:text-[0.7rem]`}>
                            Image
                        </h2>
                    </div>
                    <div className="w-[50px] lg:w-[100px] h-[2px] bg-white"></div>
                    <div className="flex gap-2 lg:gap-4 items-center">
                        <div
                            className={`border border-[#777] rounded-[5px] lg:rounded-[10px] w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] flex items-center justify-center ${
                                currentStepIndex !== 1 && "text-[#777]"
                            } max-[1024px]:text-[0.7rem]`}>
                            2
                        </div>
                        <h2
                            className={`${
                                currentStepIndex !== 1 && "text-[#777]"
                            } max-[1024px]:text-[0.7rem]`}>
                            Create
                            <br />
                            article
                        </h2>
                    </div>
                    <div className="w-[50px] lg:w-[100px] h-[2px] bg-white"></div>
                    <div className="flex gap-2 lg:gap-4 items-center">
                        <div
                            className={`border border-[#777] rounded-[5px] lg:rounded-[10px] w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] flex items-center justify-center ${
                                currentStepIndex !== 2 && "text-[#777]"
                            } max-[1024px]:text-[0.7rem]`}>
                            3
                        </div>
                        <h2
                            className={`${
                                currentStepIndex !== 2 && "text-[#777]"
                            } max-[1024px]:text-[0.7rem]`}>
                            Finish
                        </h2>
                    </div>
                </div>
            </div>
            {currentStepIndex === 0 && (
                <CreateArticleStepOne
                    currentStepIndex={currentStepIndex}
                    next={next}
                    back={back}
                    {...data}
                    updateFields={updateFields}
                />
            )}
            {currentStepIndex === 1 && (
                <CreateArticleStepTwo
                    currentStepIndex={currentStepIndex}
                    next={next}
                    back={back}
                    {...data}
                    updateFields={updateFields}
                />
            )}
            {currentStepIndex === 2 && (
                <CreateArticleStepThree
                    currentStepIndex={currentStepIndex}
                    next={next}
                    back={back}
                    {...data}
                    create={isEdit ? updateArticle : createArticle}
                    isEdit={isEdit}
                />
            )}
        </div>
    );
};

export default CreateArticle;
