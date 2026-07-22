import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SocialAnxietyQuestions = ({ onLeaveTest, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState(0);

    const questions = [
        "I worry about what other people will think of me even when I know it doesn't make any difference.",
        "I am unconcerned even if I know people are forming an unfavorable impression of me.",
        "I am frequently afraid of other people noticing my shortcomings.",
        "I rarely worry about what kind of impression I am making on someone.",
        "I am afraid others will not approve of me.",
        "I am afraid that people will find fault with me.",
        "Other people's opinions of me do not bother me.",
        "When I am talking to someone, I worry about what they may be thinking about me.",
        "I am usually worried about what kind of impression I make.",
        "If I know someone is judging me, it has little effect on me.",
        "Sometimes I think I am too concerned with what other people think of me.",
        "I often worry that I will say or do the wrong things."
    ];

    const options = [
        "Not at all characteristic of me",
        "Slightly characteristic of me",
        "Moderately characteristic of me",
        "Very characteristic of me",
        "Extremely characteristic of me"
    ];

    const handleOptionSelect = (questionIndex, optionIndex) => {
        const newAnswers = {
            ...answers,
            [questionIndex]: optionIndex
        };
        setAnswers(newAnswers);

        if (currentQuestion === questions.length - 1) {
            setTimeout(() => {
                onComplete(newAnswers);
            }, 400);
        } else {
            setDirection(1);
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                }
            }, 300);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setDirection(-1);
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 60 : -60,
            opacity: 0,
            scale: 0.98,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? -60 : 60,
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
    };

    const optionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.06,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
        selected: {
            borderColor: "#FFCF6C",
            backgroundColor: "#FFCF6C",
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <div className="flex flex-col items-end p-8 gap-8 min-h-[773px] h-auto w-[604px] bg-[#FFF2D5] rounded-[32px]">
            <div className="flex flex-col items-start p-0 gap-8 w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                {/* Header Section */}
                <div className="flex flex-col items-start p-0 gap-4 w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                    <motion.h1
                        className="w-[540px] h-[33px] font-['Lora'] font-semibold text-[32px] leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        Social Anxiety Test
                    </motion.h1>
                    <motion.p
                        className="w-[540px] h-12 font-['Lato'] font-normal text-[20px] leading-[120%] text-[#191C1C] flex-none order-1 self-stretch grow-0"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        Understand your social comfort zones and learn how you respond in social situations.
                    </motion.p>
                </div>

                {/* Question Section */}
                <div className="flex flex-col items-start p-0 gap-8 w-[540px] h-auto flex-none order-1 self-stretch grow-0">
                    {/* Progress Bar */}
                    <div className="flex flex-col items-start p-0 gap-4 w-[540px] h-[62px] flex-none order-0 self-stretch grow-0">
                        <motion.div
                            className="w-[540px] h-2.5 bg-white rounded-[49px] flex-none order-0 self-stretch grow-0 relative overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute h-2.5 bg-[#FFCF6C] rounded-[49px]"
                                style={{ width: `${progress}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            />
                        </motion.div>
                        <div className="flex flex-row items-center p-0 gap-2 w-[540px] h-9 flex-none order-1 self-stretch grow-0">
                            <motion.svg
                                className={`w-6 h-6 flex-none cursor-pointer transition-opacity ${currentQuestion === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                    }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={handlePrevious}
                                style={{ transform: 'rotate(180deg)' }}
                                whileHover={currentQuestion !== 0 ? { scale: 1.1 } : {}}
                                whileTap={currentQuestion !== 0 ? { scale: 0.9 } : {}}
                                transition={{ duration: 0.2 }}
                            >
                                <path d="M5 12H19" stroke="#191C1C" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 5L19 12L12 19" stroke="#191C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                            <motion.span
                                className="font-['Lato'] font-light text-2xl leading-[150%] text-[#191C1C]"
                                key={currentQuestion}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                Question {currentQuestion + 1} of {questions.length}
                            </motion.span>
                            <div className="flex-1"></div>
                        </div>
                    </div>

                    {/* Question and Options */}
                    <div className="flex flex-col items-start p-0 gap-6 w-[540px] h-auto flex-none order-1 self-stretch grow-0 overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentQuestion}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full"
                            >
                                <motion.h2
                                    className="w-[540px] h-auto font-['Lora'] font-semibold text-[32px] leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    {questions[currentQuestion]}
                                </motion.h2>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex flex-col items-start p-0 gap-4 w-[540px] h-auto flex-none order-1 self-stretch grow-0">
                            {options.map((option, index) => {
                                const isSelected = answers[currentQuestion] === index;
                                return (
                                    <motion.div
                                        key={`${currentQuestion}-${index}`}
                                        custom={index}
                                        variants={optionVariants}
                                        initial="hidden"
                                        animate={isSelected ? "selected" : "visible"}
                                        className={`box-border flex flex-row items-center p-6 px-4 gap-2.5 w-[540px] h-auto min-h-[73px] border rounded-2xl cursor-pointer transition-all ${isSelected
                                            ? 'border-[#FFCF6C] bg-[#FFCF6C]'
                                            : 'border-[#191C1C] hover:border-[#FFCF6C] hover:bg-[#FFCF6C] hover:bg-opacity-30'
                                            }`}
                                        onClick={() => handleOptionSelect(currentQuestion, index)}
                                    >
                                        <div className="w-6 h-6 flex-none order-0 grow-0 relative">
                                            <motion.div
                                                className={`absolute w-[17px] h-[17px] left-[3.5px] top-[3.5px] rounded-full border ${isSelected
                                                    ? 'border-[#191C1C] bg-[#FFCF6C]'
                                                    : 'border-[#191C1C]'
                                                    }`}
                                                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                                                transition={{ duration: 0.3 }}
                                            />
                                            {isSelected && (
                                                <motion.div
                                                    className="absolute w-[8px] h-[8px] left-[8px] top-[8px] rounded-full bg-[#191C1C]"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                />
                                            )}
                                        </div>
                                        <span className={`flex-1 h-auto font-['Lato'] font-semibold text-2xl leading-[102.08%] flex-none order-1 grow ${isSelected ? 'text-[#191C1C]' : 'text-[#191C1C]'
                                            }`}>
                                            {option}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Leave Test Button */}
                    <div className="flex flex-row justify-end items-center w-[540px] h-auto flex-none order-2 self-stretch grow-0">
                        <motion.div
                            className="flex flex-row items-center p-0 gap-4 h-6 flex-none cursor-pointer"
                            onClick={onLeaveTest}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="font-['Lato'] font-semibold text-base leading-[102.08%] text-[#191C1C] flex-none">
                                Leave Test
                            </span>
                            <motion.svg
                                className="w-6 h-6 rotate-180 flex-none"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                whileHover={{ x: -3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#CF0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 17L21 12L16 7" stroke="#CF0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12H9" stroke="#CF0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialAnxietyQuestions;