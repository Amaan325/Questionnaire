// PTSDTResults.jsx
import React from "react";
import { motion } from "framer-motion";
import vector from "../../assets/icons/Vector.svg";

const PTSDTResults = ({ answers, onRetake, onLearnMore }) => {
    const { traumaExposure, score } = answers;

    // Get result category based on score
    const getResultCategory = (score, traumaExposure) => {
        // If no trauma exposure
        if (traumaExposure === false) {
            return {
                title: "No Trauma Exposure Reported",
                description: "You indicated you have not experienced any traumatic events. The PC-PTSD-5 screening is complete with a score of 0.",
                disclaimer: "It is always recommended to consult a medical professional within the field of psychology to fully understand the results of this tool. This result is not considered medical advice."
            };
        }

        // Score 0-2: Negative screen
        if (score <= 2) {
            return {
                title: "Low Likelihood of PTSD",
                description: "Based on your responses, you do not currently show major signs of PTSD, based on this screening tool. Remember, there are no right or wrong answers here, this is a self-awareness tool.",
                disclaimer: "It is always recommended to consult a medical professional within the field of psychology to fully understand the results of this tool. This result is not considered medical advice."
            };
        }

        // Score 3-5: Positive screen
        if (score >= 3) {
            return {
                title: "High Likelihood of PTSD",
                description: "Based on your responses, you show several symptoms that are common after experiencing a traumatic event, based on this screening tool. Remember, there are no right or wrong answers here, this is a self-awareness tool.",
                disclaimer: "It is always recommended to consult a medical professional within the field of psychology to fully understand the results of this tool. This result is not considered medical advice."
            };
        }

        // Fallback
        return {
            title: "Screening Complete",
            description: "Thank you for completing the PC-PTSD-5 screening tool.",
            disclaimer: "It is always recommended to consult a medical professional within the field of psychology to fully understand the results of this tool. This result is not considered medical advice."
        };
    };

    const result = getResultCategory(score, traumaExposure);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
                staggerChildren: 0.15,
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

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 my-2 sm:my-3 lg:my-4 h-auto w-full max-w-[604px] mx-auto bg-[#FFF2D5] rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col items-start p-0 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                {/* Congrats Section */}
                <div className="flex flex-col items-center p-0 gap-3 sm:gap-4 lg:gap-5 w-full h-auto flex-none order-0 self-stretch grow-0">
                    {/* Check Badge Icon */}
                    <motion.div
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[72px] lg:h-[72px] flex-none order-0 grow-0 relative"
                        variants={iconVariants}
                    >
                        <img src={vector} alt="Success" className="w-full h-full" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="flex flex-col items-center p-0 gap-1 sm:gap-1.5 lg:gap-2 w-full h-auto flex-none order-1 self-stretch grow-0"
                        variants={itemVariants}
                    >
                        <h1
                            className="w-full max-w-[540px] h-auto font-['Lato'] font-normal text-[28px] leading-[102%] text-center text-[#191C1C] flex-none order-0 self-stretch grow-0"
                            style={{ letterSpacing: '0%' }}
                        >
                            Your Scores Show:
                        </h1>

                        <p
                            className="w-full max-w-[541px] h-auto font-['Lora'] font-semibold text-[32px] leading-[102%] text-center text-[#191C1C] flex-none order-1 self-stretch grow-0"
                            style={{ letterSpacing: '0%' }}
                        >
                            {result.title}
                        </p>
                    </motion.div>
                </div>

                {/* Description */}
                <motion.p
                    className="w-full max-w-[540px] h-[96px] font-['Lato'] font-light text-[20px] leading-[120%] text-center text-[#191C1C] flex-none order-2 self-stretch grow-0 flex items-center"
                    style={{ letterSpacing: '0%' }}
                    variants={itemVariants}
                >
                    {result.description}
                </motion.p>

                {/* Disclaimer with Border - Left aligned */}
                <motion.div
                    className="w-full max-w-[492px] h-auto border border-[#191C1C] rounded-[24px] p-6 flex flex-col gap-4 flex-none order-3 self-center grow-0"
                    variants={itemVariants}
                >
                    <p
                        className="w-full h-[57px] font-['Lato'] font-light text-[16px] leading-[120%] text-left text-[#191C1C] flex items-center"
                        style={{ letterSpacing: '0%' }}
                    >
                        {result.disclaimer}
                    </p>
                </motion.div>

                {/* Buttons */}
                <div className="flex flex-row justify-center items-center w-full max-w-[401px] h-auto flex-none order-4 self-center grow-0 mt-2">
                    <motion.button
                        className="flex flex-row justify-center items-center p-3 sm:p-4 gap-2.5 w-[133px] h-[48px] sm:h-[56px] bg-[#FFCF6C] rounded-[10px] hover:bg-[#FFC04C] transition-colors flex-none mr-[-10px]"
                        onClick={onRetake}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="w-full h-auto font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[120%] text-[#191C1C] flex-none order-0 grow-0 whitespace-nowrap">
                            Retake Test
                        </span>
                    </motion.button>
                    <motion.button
                        className="flex flex-row justify-center items-center p-3 sm:p-4 px-0 gap-2.5 w-[150px] h-[48px] sm:h-[56px] rounded-[10px] hover:opacity-70 transition-opacity flex-none"
                        onClick={onLearnMore}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="w-[220px] h-auto font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[120%] underline text-[#191C1C] flex-none order-0 grow-0 whitespace-nowrap">
                            See All Tests
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default PTSDTResults;