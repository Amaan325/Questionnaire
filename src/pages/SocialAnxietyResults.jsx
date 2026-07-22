import React from "react";
import { motion } from "framer-motion";
import vector from "../assets/icons/Vector.svg";

const SocialAnxietyResults = ({ answers, onRetake, onLearnMore }) => {
    // Calculate BFNE score with reverse scoring
    const calculateBFNEScore = (answers) => {
        // Reverse scored items: 2, 4, 7, 10 (0-indexed: 1, 3, 6, 9)
        const reverseScoredItems = [1, 3, 6, 9];
        const totalQuestions = 12;

        let totalScore = 0;

        // Iterate over each question by index
        for (let i = 0; i < totalQuestions; i++) {
            // Get the answer for this question (default to 0 if not answered)
            const value = answers[i] !== undefined ? answers[i] : 0;

            if (reverseScoredItems.includes(i)) {
                // Reverse score: 0->4, 1->3, 2->2, 3->1, 4->0
                totalScore += (4 - value);
            } else {
                totalScore += value;
            }
        }

        // Convert from 0-4 scale to 1-5 scale (add 1 to each answer)
        // Total score range: 12-60
        const finalScore = totalScore + 12;

        return finalScore;
    };

    // Get result category based on score
    const getResultCategory = (score) => {
        // Using the ranges specified by client: 1-20, 21-40, 41-60
        if (score <= 20) {
            return {
                type: "Low Social Anxiety",
                description: "You show very low levels of social anxiety. You're comfortable in social situations and don't worry much about others' opinions. You have a healthy sense of self and are able to engage with others without excessive concern about being judged."
            };
        } else if (score <= 40) {
            return {
                type: "Moderate Social Anxiety",
                description: "You experience moderate levels of social anxiety. You sometimes worry about others' opinions and may feel some discomfort in social situations. This is a common experience that many people share. Consider practicing self-compassion and gradually building confidence in social settings."
            };
        } else {
            return {
                type: "High Social Anxiety",
                description: "You show signs of significant social anxiety. You frequently worry about others' opinions and may find social situations particularly challenging. This level of social anxiety can impact daily life. Consider speaking with a mental health professional who can help you develop strategies to manage these feelings."
            };
        }
    };

    // Calculate score
    const totalScore = calculateBFNEScore(answers);
    const result = getResultCategory(totalScore);

    // Get personalized article recommendations based on result type
    const getArticles = (resultType) => {
        const articles = {
            "Low Social Anxiety": [
                "Maintaining Healthy Social Connections",
                "How to Support Others with Social Anxiety",
                "Building Deeper Relationships Through Empathy"
            ],
            "Moderate Social Anxiety": [
                "Mindful Practices to Overcome Social Pressure and Find Peace",
                "5 Ways to Build Social Confidence",
                "Understanding the Hidden Triggers Behind Social Anxiety and Fear"
            ],
            "High Social Anxiety": [
                "Understanding the Hidden Triggers Behind Social Anxiety and Fear",
                "Seeking Professional Help for Social Anxiety",
                "Self-Care Strategies for Managing Anxiety",
                "Support Groups and Community Resources"
            ]
        };

        return articles[resultType] || articles["Moderate Social Anxiety"];
    };

    const recommendedArticles = getArticles(result.type);

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

    const articleVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
    };

    return (
        <motion.div
            className="flex flex-col items-center p-8 gap-8 w-[604px] min-h-[650px] h-auto bg-[#FFF2D5] rounded-[32px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex flex-col items-start p-0 gap-8 w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                {/* Congrats Section */}
                <div className="flex flex-col items-center p-0 gap-6 w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                    {/* Check Badge Icon */}
                    <motion.div
                        className="w-[72px] h-[72px] flex-none order-0 grow-0 relative"
                        variants={iconVariants}
                    >
                        <img src={vector} alt="Success" className="w-full h-full" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="flex flex-col items-center p-0 gap-4 w-[540px] h-auto flex-none order-1 self-stretch grow-0"
                        variants={itemVariants}
                    >
                        <h1 className="w-[540px] h-[33px] font-['Lora'] font-semibold text-[32px] leading-[102.08%] text-center text-[#191C1C] flex-none order-0 self-stretch grow-0">
                            Congratulations!
                        </h1>
                        <p className="w-[540px] h-[29px] font-['Lato'] font-normal text-[28px] leading-[102.08%] text-center text-[#191C1C] flex-none order-1 self-stretch grow-0">
                            You are a {result.type}
                        </p>
                    </motion.div>
                </div>

                {/* Underline - Just below the result text */}
                <motion.div
                    className="w-[240px] h-[1px] mx-auto bg-[#191C1C] flex-none order-1 self-center"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Description */}
                <motion.p
                    className="w-[540px] h-auto font-['Lato'] font-light text-[20px] leading-[120%] text-center text-[#191C1C] flex-none order-2 self-stretch grow-0"
                    variants={itemVariants}
                >
                    {result.description}
                </motion.p>
            </div>

            {/* Recommended Articles Section */}
            <motion.div
                className="box-border flex flex-col items-start p-6 gap-4 w-[540px] h-auto min-h-[188px] border border-[#191C1C] rounded-3xl flex-none order-1 self-stretch grow-0"
                variants={itemVariants}
            >
                <h3 className="w-full h-6 font-['Merriweather'] font-normal text-[20px] leading-[120%] text-[#191C1C] flex-none order-0 self-stretch grow-0">
                    Recommended Articles to Read
                </h3>
                <div className="flex flex-col items-start p-0 gap-2 w-full h-auto flex-none order-1 self-stretch grow-0">
                    {recommendedArticles.map((article, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-row items-start gap-2 w-full h-auto flex-none order-0 self-stretch grow-0"
                            custom={index}
                            variants={articleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <span className="text-[#191C1C] font-['Lato'] text-[16px] leading-[120%] flex-shrink-0">•</span>
                            <motion.a
                                href="#"
                                className="inline-block font-['Lato'] font-light text-[16px] leading-[120%] text-[#191C1C] hover:text-[#FFCF6C] transition-colors border-b border-[#191C1C] border-opacity-20 pb-0.5"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                {article}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                className="flex flex-row justify-center items-start p-0 gap-8 w-[401px] h-[56px] flex-none order-2 grow-0"
                variants={itemVariants}
            >
                <motion.button
                    className="flex flex-row justify-center items-center p-4 gap-2.5 w-[133px] h-[56px] bg-[#FFCF6C] rounded-[10px] hover:bg-[#FFC04C] transition-colors flex-none order-0 grow-0"
                    onClick={onRetake}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="w-[104px] h-6 font-['Lato'] font-semibold text-[20px] leading-[120%] text-[#191C1C] flex-none order-0 grow-0">
                        Retake Test
                    </span>
                </motion.button>
                <motion.button
                    className="flex flex-row justify-center items-center p-4 px-0 gap-2.5 w-[236px] h-[56px] rounded-[10px] hover:opacity-70 transition-opacity flex-none order-1 grow-0"
                    onClick={onLearnMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="w-[238px] h-6 font-['Lato'] font-semibold text-[20px] leading-[120%] underline text-[#191C1C] flex-none order-0 grow-0">
                        Learn More about this Test
                    </span>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default SocialAnxietyResults;