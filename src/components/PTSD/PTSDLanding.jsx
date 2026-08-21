// PTSDLanding.jsx
import React from "react";
import { motion } from "framer-motion";

const PTSDLanding = ({ onStartTest }) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
    };

    return (
        <motion.div
            className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 my-2 sm:my-3 lg:my-4 h-auto w-full max-w-[604px] mx-auto bg-[#FFF2D5] rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col items-start p-0 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                {/* Header Section */}
                <div className="flex flex-col items-start p-0 gap-3 sm:gap-4 lg:gap-5 w-full h-auto flex-none order-0 self-stretch grow-0">
                    <motion.h1
                        className="w-full h-auto font-['Lora'] font-semibold text-xl sm:text-2xl lg:text-3xl leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0"
                        variants={itemVariants}
                    >
                        PTSD Test (PC-PTSD-5)
                    </motion.h1>
                    <motion.p
                        className="w-full h-auto font-['Lato'] font-normal text-sm sm:text-base lg:text-lg leading-[120%] text-[#191C1C] flex-none order-1 self-stretch grow-0"
                        variants={itemVariants}
                    >
                        A brief 5-item screening tool to help identify individuals who may have PTSD. This test assesses how trauma may be affecting you in the past month.
                    </motion.p>
                    <motion.div
                        className="flex flex-row items-center p-0 gap-3 sm:gap-4 w-full h-auto flex-none order-2 grow-0"
                        variants={itemVariants}
                    >
                        <div className="flex flex-row items-center p-0 gap-1.5 sm:gap-2 w-auto h-auto flex-none order-0 grow-0">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-none order-0 grow-0 relative">
                                <svg
                                    className="absolute left-[12.5%] right-[12.5%] top-[8.33%] bottom-[8.33%]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="3"
                                        stroke="#191C1C"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="8"
                                        y1="10"
                                        x2="16"
                                        y2="10"
                                        stroke="#191C1C"
                                        strokeWidth="1.5"
                                    />
                                    <line
                                        x1="8"
                                        y1="14"
                                        x2="11"
                                        y2="14"
                                        stroke="#191C1C"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <span className="font-['Lato'] font-normal text-xs sm:text-sm lg:text-base leading-[120%] text-[#191C1C] flex-none order-1 grow-0">
                                5 Questions
                            </span>
                        </div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#191C1C] rounded-full flex-none order-1 grow-0"></div>
                        <div className="flex flex-row items-center p-0 gap-1.5 sm:gap-2 w-auto h-auto flex-none order-2 grow-0">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-none order-0 grow-0 relative">
                                <svg
                                    className="absolute left-[12.5%] right-[12.5%] top-[12.5%] bottom-[12.5%]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="12" r="9" stroke="#191C1C" strokeWidth="2" />
                                    <path
                                        d="M12 7V12L15 15"
                                        stroke="#191C1C"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <span className="font-['Lato'] font-normal text-xs sm:text-sm lg:text-base leading-[120%] text-[#191C1C] flex-none order-1 grow-0">
                                2-3 mins
                            </span>
                        </div>
                    </motion.div>
                    <div className="flex flex-row items-start p-0 gap-2 sm:gap-3 w-full flex-wrap flex-none order-3 grow-0">
                        {["PTSD", "Trauma", "Screening"].map((tag, index) => (
                            <motion.div
                                key={tag}
                                custom={index}
                                variants={tagVariants}
                                className="box-border flex flex-row justify-center items-center py-1 sm:py-1.5 px-2 sm:px-2.5 gap-1.5 sm:gap-2.5 border border-black rounded-[51px] flex-none grow-0"
                            >
                                <span className="font-['Lato'] font-light text-xs sm:text-sm lg:text-base leading-[120%] text-[#191C1C] flex-none order-0 grow-0">
                                    {tag}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Start Test Button */}
                <motion.div
                    className="flex flex-row justify-center items-center p-3 sm:p-4 gap-2.5 w-full h-[48px] sm:h-[54px] bg-[#FFCF6C] rounded-[10px] flex-none order-2 self-stretch grow-0 cursor-pointer hover:bg-[#FFC04C] transition-colors"
                    onClick={onStartTest}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[120%] text-[#191C1C] flex-none order-0 grow-0">
                        Start Test
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PTSDLanding;