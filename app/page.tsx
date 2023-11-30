import BlogOverview from "@/components/BlogOverview";
import ChartOverview from "@/components/ChartOverview";
import CompaniesOverview from "@/components/CompaniesOverview";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";

export default function Home() {
    return (
        <>
            <div className="dots-background h-screen relative flex">
                <div className="place-self-center w-full flex flex-col items-center gap-10 md:gap-14 lg:gap-3 max-[1024px]:p-4">
                    <h1 className="border-[0.5px] border-gray-500 p-6 md:p-14 backdrop-blur-[1px] text-4xl lg:text-7xl text-white lg:w-2/3 text-center">
                        The{" "}
                        <span
                            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-orange-400"
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                            complete
                        </span>{" "}
                        aplication for sharing articles about global economy
                    </h1>
                    <div className="flex items-center justify-center gap-4 w-full md:w-2/3 py-5 md:py-3 bg-gradient-to-r from-emerald-500/40 via-sky-500/40 to-orange-400/40">
                        <IoTriangleSharp className="text-4xl md:text-6xl text-white" />

                        <h1 className="text-white text-4xl md:text-6xl">
                            Economist
                        </h1>
                    </div>
                    <div className="lg:w-2/3 flex">
                        <p className="text-gray-400 text-center text-lg lg:w-1/2 p-6 md:p-10 border-[0.5px] border-gray-500 backdrop-blur-[1px]">
                            The Application for{" "}
                            <span className="text-white">creating</span>,{" "}
                            <span className="text-white">editing</span> and{" "}
                            <span className="text-white">reading</span> articles
                            with variety of market data ( e.g advanced chart,
                            economic calendar and stock information )
                        </p>

                        <div className="max-[1024px]:hidden flex gap-6 justify-center items-center lg:w-1/2 p-10 border-[0.5px] border-gray-500 backdrop-blur-[1px]">
                            <Link href={"/blog"}>
                                <button className="flex justify-center items-center bg-[#FBF8F3] text-[#000] border border-[#777] hover:bg-stone-300 shadow-lg rounded-full px-5 py-3">
                                    Go to Blog
                                </button>
                            </Link>
                            <Link href={"/creator-center"}>
                                <button className="flex justify-center items-center bg-[#000] text-white border border-[#777] hover:bg-zinc-900 shadow-lg rounded-full px-5 py-3">
                                    Go to Creator center
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <BlogOverview />
                <ChartOverview />
                <CompaniesOverview />
            </div>
        </>
    );
}
