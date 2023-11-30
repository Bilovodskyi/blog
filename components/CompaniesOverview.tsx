import Image from "next/image";
import React from "react";

const CompaniesOverview = () => {
    return (
        <div className="py-[50px] px-4 lg:px-[80px]">
            <div className="mb-[30px]">
                <h1 className="text-4xl pb-3 font-semibold">
                    Largest US companies
                </h1>
                <p className="text-[#83AF8F] text-xl">by capitalization</p>
            </div>
            <div className="lg:flex lg:justify-between max-[1024px]:relative">
                <div className="lg:w-2/5 flex flex-col gap-4 lg:gap-10 justify-center max-[1024px]:mb-[15px]">
                    <div className="flex flex-col mb-2 lg:gap-4">
                        <div className="w-[30px] h-[30px] bg-[#ECEFAF] rounded-[5px] flex items-center justify-center">
                            <Image
                                src="/united-states.png"
                                width={25}
                                height={25}
                                alt="USA flag"
                            />
                        </div>
                        <h1 className="font-semibold lg:text-[1.1rem]">
                            US Stocks
                        </h1>
                        <p className="max-[1024px]:text-[0.9rem]">
                            Get most accurate price for US stocks from All US
                            exchanges such as Nasdaq, NYSE and more{" "}
                        </p>
                    </div>
                    <div className="flex flex-col mb-2 lg:gap-4">
                        <div className="w-[30px] h-[30px] bg-[#ECEFAF] rounded-[5px] flex items-center justify-center">
                            <Image
                                src="/database.png"
                                width={25}
                                height={25}
                                alt="database"
                            />
                        </div>
                        <h1 className="font-semibold lg:text-[1.1rem]">
                            Market data
                        </h1>
                        <p className="max-[1024px]:text-[0.9rem]">
                            Big variety of data available on our platform such
                            as capitalisation, earnings and more will improve
                            your investing score
                        </p>
                    </div>
                    <div className="flex flex-col mb-2 lg:gap-4">
                        <div className="w-[30px] h-[30px] bg-[#ECEFAF] rounded-[5px] flex items-center justify-center">
                            <Image
                                src="/growth-chart.png"
                                width={25}
                                height={25}
                                alt="growth chart"
                            />
                        </div>
                        <h1 className="font-semibold lg:text-[1.1rem]">
                            Modern charts
                        </h1>
                        <p className="max-[1024px]:text-[0.9rem]">
                            Modern charts help to visualise latest market data
                            and improve your investment experience
                        </p>
                    </div>
                </div>
                <table className="max-[1024px]:relative table-auto w-full lg:w-1/2 border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th className="font-normal text-[0.75rem] lg:text-[0.9rem] text-[#777]">
                                Symbol
                            </th>
                            <th className="font-normal text-[0.75rem] lg:text-[0.9rem] text-[#777]">
                                Market cap.
                            </th>
                            <th className="font-normal text-[0.75rem] lg:text-[0.9rem] text-[#777]">
                                Price
                            </th>
                        </tr>
                    </thead>

                    <TableBody
                        num={1}
                        url="/AAPL.png"
                        company="Apple"
                        symbol="AAPL"
                        cap="$ 2.613 T"
                        price="$ 165,21"
                    />

                    <TableBody
                        num={2}
                        url="/MSFT.png"
                        company="Microsoft"
                        symbol="MSFT"
                        cap="$ 2.129 T"
                        price="$ 286,14"
                    />
                    <TableBody
                        num={3}
                        url="/GOOG.png"
                        company="Google"
                        symbol="GOOG"
                        cap="$ 1.396 T"
                        price="$ 109,46"
                    />
                    <TableBody
                        num={4}
                        url="/AMZN.png"
                        company="Amazon"
                        symbol="AMZN"
                        cap="$ 1.050 T"
                        price="$ 102,51"
                    />
                    <TableBody
                        num={5}
                        url="/BRK-B.png"
                        company="Berkshire Hathaway"
                        symbol="BRK-B"
                        cap="$ 709.28 B"
                        price="$ 319,54"
                    />
                    <TableBody
                        num={6}
                        url="/NVDA.png"
                        company="Nvidia"
                        symbol="NVDA"
                        cap="$ 660.92 B"
                        price="$ 268,58"
                    />
                    <TableBody
                        num={7}
                        url="/TSLA.png"
                        company="Tesla"
                        symbol="TSLA"
                        cap="$ 586.32 B"
                        price="$ 185,00"
                    />
                </table>
            </div>
        </div>
    );
};

const TableBody = ({
    num,
    url,
    company,
    symbol,
    cap,
    price,
}: TableBodyType) => {
    return (
        <tbody>
            <tr className="bg-[#ECEFAF] rounded-[10px]">
                <td className="flex h-[50px] lg:h-[70px] items-center gap-4 lg:gap-6 px-2 lg:px-8">
                    <h1 className="max-[1024px]:text-[0.8rem]">{num}</h1>
                    <Image
                        src={url}
                        width={50}
                        height={50}
                        alt={company}
                        className="w-[30px] lg:w-[50px]"
                    />
                    <div>
                        <h1 className="max-[1024px]:text-[0.8rem]">
                            {company}
                        </h1>
                        <p className="text-[#777] text-[0.65rem] lg:text-[0.75rem]">
                            {symbol}
                        </p>
                    </div>
                </td>
                <td>
                    <h1 className="text-[0.8rem] lg:text-[1.1rem] text-center">
                        {cap}
                    </h1>
                </td>
                <td>
                    <h1 className="text-[0.8rem] lg:text-[1.1rem] text-center">
                        {price}
                    </h1>
                </td>
            </tr>
        </tbody>
    );
};

export default CompaniesOverview;
