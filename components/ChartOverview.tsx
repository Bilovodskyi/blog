import Image from "next/image";
import React from "react";

const ChartOverview = () => {
    return (
        <div className="py-[50px] px-4 lg:px-[80px]">
            <div className="mb-[40px] lg:mb-[30px]">
                <h1 className="text-4xl pb-3 font-semibold">Advanced charts</h1>
                <p className="text-[#83AF8F] text-xl">and statistics</p>
            </div>
            <div className="flex items-center justify-center lg:justify-between">
                <Image
                    src={"/fundamentals-left.png"}
                    width={600}
                    height={1000}
                    alt="fundamentals"
                    className="blur-sm"
                />
                <Image
                    src={"/fundamentals-r.png"}
                    width={600}
                    height={1000}
                    alt="fundamentals"
                    className="max-[1024px]:hidden"
                />
                {/* <div className="w-[41%] h-[75%] rounded-[10px] absolute left-[80px] blur-xl"></div> */}
                <div className="border border-[#ccc] w-[90%] lg:w-[41%] lg:h-[75%] rounded-[10px] absolute lg:left-[80px] bg-white/70 py-8 lg:py-[75px] px-6 lg:px-[60px] flex flex-col gap-4 lg:gap-8">
                    <h1 className="text-2xl lg:text-4xl">
                        Advanced charts that helps you better analyse data
                    </h1>
                    <h2 className="text-[#EB652B] lg:text-xl font-semibold">
                        All you need in one place
                    </h2>
                    <p className="lg:text-[1.2rem] mt-10">
                        To start using all features that provides our charts,
                        first simply search for instrument you want to analyze
                        click on it, in the &quot;Single Stock&quot; page that
                        openes go to the &quot;Fundamentals&quot; section
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChartOverview;
