import React from "react";
import { motion } from "framer-motion";

const SocialAnxietyLanding = ({ onStartTest }) => {
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
            className="flex flex-col items-start p-8 gap-2.5 w-[604px] h-[334px] bg-[#FFF2D5] rounded-[32px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col items-start p-0 gap-8 w-[540px] h-[353px] flex-none order-0 self-stretch grow-0">
                {/* Header Section */}
                <div className="flex flex-col items-start p-0 gap-4 w-[540px] h-[184px] flex-none order-0 self-stretch grow-0">
                    <motion.h1
                        className="w-[540px] h-[33px] font-['Lora'] font-semibold text-[32px] leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0"
                        variants={itemVariants}
                    >
                        Social Anxiety Test
                    </motion.h1>
                    <motion.p
                        className="w-[540px] h-12 font-['Lato'] font-normal text-[20px] leading-[120%] text-[#191C1C] flex-none order-1 self-stretch grow-0"
                        variants={itemVariants}
                    >
                        Understand your social comfort zones and learn how you respond in social situations.
                    </motion.p>
                    <motion.div
                        className="flex flex-row items-center p-0 gap-4 w-[261px] h-6 flex-none order-2 grow-0"
                        variants={itemVariants}
                    >
                        <div className="flex flex-row items-center p-0 gap-2 w-[127px] h-6 flex-none order-0 grow-0">
                            <div className="w-6 h-6 flex-none order-0 grow-0 relative">
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
                            <span className="w-[95px] h-[19px] font-['Lato'] font-normal text-[16px] leading-[120%] text-[#191C1C] flex-none order-1 grow-0">
                                12 Questions
                            </span>
                        </div>
                        <div className="w-2 h-2 bg-[#191C1C] rounded-full flex-none order-1 grow-0"></div>
                        <div className="flex flex-row items-center p-0 gap-2 w-[94px] h-6 flex-none order-2 grow-0">
                            <div className="w-6 h-6 flex-none order-0 grow-0 relative">
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
                            <span className="w-[62px] h-[19px] font-['Lato'] font-normal text-[16px] leading-[120%] text-[#191C1C] flex-none order-1 grow-0">
                                5-7 mins
                            </span>
                        </div>
                    </motion.div>
                    <div className="flex flex-row items-start p-0 gap-3 w-[304px] h-[31px] flex-none order-3 grow-0">
                        {["Anxiety", "Personality", "Relationships"].map((tag, index) => (
                            <motion.div
                                key={tag}
                                custom={index}
                                variants={tagVariants}
                                className="box-border flex flex-row justify-center items-center py-1.5 px-2.5 gap-2.5 border border-black rounded-[51px] flex-none grow-0"
                            >
                                <span className="font-['Lato'] font-light text-[16px] leading-[120%] text-[#191C1C] flex-none order-0 grow-0">
                                    {tag}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Start Test Button */}
                <motion.div
                    className="flex flex-row justify-center items-center p-4 gap-2.5 w-[540px] h-[54px] bg-[#FFCF6C] rounded-[10px] flex-none order-2 self-stretch grow-0 cursor-pointer hover:bg-[#FFC04C] transition-colors"
                    onClick={onStartTest}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="w-[79px] h-[22px] font-['Lato'] font-semibold text-[18px] leading-[120%] text-[#191C1C] flex-none order-0 grow-0">
                        Start Test
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SocialAnxietyLanding;