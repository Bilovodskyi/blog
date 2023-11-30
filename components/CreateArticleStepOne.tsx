"use client";
import React, { useEffect, useState } from "react";
import CreateArticleButtons from "./CreateArticleButtons";
import { FaCamera, FaDownload } from "react-icons/fa";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase";

const CreateArticleStepOne = ({
    currentStepIndex,
    next,
    back,
    image,
    updateFields,
}: StepsProps) => {
    const [error, setError] = useState("");
    const [file, setFile] = useState<File>();

    useEffect(() => {
        const uploadFile = () => {
            const uniqueName = new Date().getTime() + file!.name; // to prevent overriding files, when uploading multiple
            const storageRef = ref(storage, uniqueName);
            const uploadTask = uploadBytesResumable(storageRef, file!);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    setError(error.message);
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            // setData(downloadURL);
                            updateFields({ image: downloadURL });
                        }
                    );
                }
            );
        };
        file && uploadFile();
    }, [file]);

    return (
        <div className="w-[100%] h-[calc(100%-60px)] lg:h-4/5 flex max-[1024px]:flex-col-reverse  max-[1024px]:gap-14 max-[1024px]:items-center max-[1024px]:justify-center">
            <div className="w-full lg:w-1/2 flex flex-col justify-between lg:p-8 lg:pl-0 max-[1024px]:gap-8">
                <div className="h-full flex items-center justify-center flex flex-col items-center justify-center gap-6">
                    <div className="w-[250px] h-[200px] lg:h-[300px] flex flex-col items-center justify-center gap-6 rounded-[10px] border border-dashed relative">
                        <FaCamera className="text-[4rem] lg:text-[8rem]" />
                        <div className="flex flex-col gap-2 px-4">
                            <div className="flex items-center justify-center gap-2">
                                <FaDownload />
                                <h1>Add image</h1>
                            </div>
                            <p className="text-center text-[.9rem] text-[#777]">
                                Recommended aspect ratio 3:1 (1440 x 480)
                            </p>
                        </div>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files![0])}
                            className="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
                <CreateArticleButtons
                    currentStepIndex={currentStepIndex}
                    next={next}
                    back={back}
                />
            </div>
            <div className="max-[1024px]:hidden w-[1px] bg-white h-[100%]" />
            <div className="lg:w-1/2 lg:pl-[30px] flex flex-col items-center gap-2 lg:mt-20">
                {/* <textarea className="w-full h-full bg-white/10 rounded-[10px] border border-[#777] outline-none p-6"></textarea> */}
                {image ? (
                    <>
                        <h1 className="text-3xl mb-10">Uploaded Photo</h1>
                        <Image
                            src={image}
                            alt="uploaded image"
                            width={610}
                            height={205}
                            className="w-[610px] h-[205px] overflow-hidden object-cover"
                        />
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl">Default Photo</h1>
                        <p className="text-sm mb-8">
                            If you don&apos;t upload a photo, that photo will be
                            used in your article by default.
                        </p>
                        <Image
                            src={"/article-default-image.jpeg"}
                            alt="default image"
                            width={610}
                            height={205}
                            className="object-contain"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateArticleStepOne;
