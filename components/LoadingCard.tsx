import React from "react";

const LoadingCard = ({ styles, index, isMobile }: LoadingCardType) => {
    return (
        <>
            {isMobile ? (
                <div className="h-[400px] mb-6">
                    <div className="h-full rounded-[10px] shadow-lg p-2 flex flex-col justify-between items-end">
                        <div className="loading w-[100%] h-[50%] rounded-[10px]"></div>
                        <div className="loading loading-text"></div>
                        <div className="loading loading-text"></div>
                        <div className="loading loading-text"></div>
                        <div className="loading loading-text"></div>
                        <div className="loading loading-text"></div>
                    </div>
                </div>
            ) : (
                <div
                    className={`${styles![index].column} ${styles[index].row}`}>
                    <div className="h-full rounded-[10px] shadow-lg p-2 flex flex-col justify-between items-end">
                        {index !== 1 && index !== 2 ? (
                            <div className="loading w-[100%] h-[80%] rounded-[10px]"></div>
                        ) : (
                            <div className="loading loading-title"></div>
                        )}
                        <div className="loading loading-text"></div>
                        <div className="loading loading-text"></div>
                        <div className="loading loading-text"></div>
                        {(index === 1 || index === 2) && (
                            <>
                                <div className="loading loading-text"></div>
                                <div className="loading loading-text"></div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingCard;
