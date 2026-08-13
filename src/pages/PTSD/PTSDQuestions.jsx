// PTSDQuestions.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PTSDQuestions = ({ onLeaveTest, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState(0);
    const [hasTraumaExposure, setHasTraumaExposure] = useState(null);

    // Step 1: Trauma exposure question
    // Steps 2-6: The 5 symptom questions (only shown if trauma exposure is YES)

    const traumaQuestion = {
        id: 'trauma',
        text: 'Sometimes things happen to people that are unusually or especially frightening, horrible, or traumatic. For example: a serious accident or fire, a physical or sexual assault or abuse, an earthquake or flood, a war, seeing someone be killed or seriously injured, having a loved one die through homicide or suicide. Have you ever experienced this kind of event?'
    };

    const symptomQuestions = [
        {
            id: 'q1',
            text: 'In the past month, have you had nightmares about the event(s) or thought about the event(s) when you did not want to?'
        },
        {
            id: 'q2',
            text: 'In the past month, have you tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?'
        },
        {
            id: 'q3',
            text: 'In the past month, have you been constantly on guard, watchful, or easily startled?'
        },
        {
            id: 'q4',
            text: 'In the past month, have you felt numb or detached from people, activities, or your surroundings?'
        },
        {
            id: 'q5',
            text: 'In the past month, have you felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?'
        }
    ];

    const totalSteps = hasTraumaExposure === false ? 1 : 1 + symptomQuestions.length;

    const handleTraumaResponse = (response) => {
        setHasTraumaExposure(response);
        setAnswers({ ...answers, traumaExposure: response });

        if (response === false) {
            // No trauma exposure - complete test with score 0
            setTimeout(() => {
                onComplete({ traumaExposure: false, score: 0 });
            }, 300);
        } else {
            // Move to first symptom question
            setDirection(1);
            setTimeout(() => {
                setCurrentStep(1);
            }, 150);
        }
    };

    const handleSymptomResponse = (questionIndex, response) => {
        const newAnswers = {
            ...answers,
            [symptomQuestions[questionIndex].id]: response
        };
        setAnswers(newAnswers);

        if (questionIndex === symptomQuestions.length - 1) {
            // All questions answered - calculate score
            setTimeout(() => {
                const score = calculateScore(newAnswers);
                onComplete({ ...newAnswers, traumaExposure: true, score });
            }, 300);
        } else {
            setDirection(1);
            setTimeout(() => {
                setCurrentStep(questionIndex + 2); // +2 because step 0 is trauma question
            }, 150);
        }
    };

    const calculateScore = (answers) => {
        // Count "yes" responses to symptom questions
        let count = 0;
        symptomQuestions.forEach(q => {
            if (answers[q.id] === true) count++;
        });
        return count; // Range: 0-5
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };

    const getProgress = () => {
        if (hasTraumaExposure === false) return 100;
        if (hasTraumaExposure === true) {
            return ((currentStep) / (1 + symptomQuestions.length)) * 100;
        }
        return 0;
    };

    const progress = getProgress();

    // Content variants for animation
    const contentVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 40 : -40,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.35,
                ease: "easeOut",
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? -30 : 30,
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: "easeIn",
            },
        }),
    };

    const isTraumaStep = currentStep === 0;
    const currentQuestionIndex = isTraumaStep ? -1 : currentStep - 1;
    const currentQuestion = isTraumaStep ? traumaQuestion : symptomQuestions[currentQuestionIndex];
    const isComplete = hasTraumaExposure === false || (hasTraumaExposure === true && currentStep === symptomQuestions.length);

    return (
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 my-2 sm:my-3 lg:my-4 h-auto w-full max-w-[604px] mx-auto bg-[#FFF2D5] rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] overflow-visible">
            <div className="flex flex-col items-start p-0 gap-3 sm:gap-4 lg:gap-5 w-full max-w-[540px] h-auto flex-none order-0 self-stretch grow-0">
                {/* Header Section */}
                <div className="flex flex-col items-start p-0 gap-1 sm:gap-1.5 lg:gap-2 w-full h-auto flex-none order-0 self-stretch grow-0">
                    <motion.h1
                        className="w-full h-auto font-['Lora'] font-semibold text-xl sm:text-2xl lg:text-3xl leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        PTSD Test (PC-PTSD-5)
                    </motion.h1>
                    <motion.p
                        className="w-full h-auto font-['Lato'] font-normal text-sm sm:text-base lg:text-lg leading-[120%] text-[#191C1C] flex-none order-1 self-stretch grow-0"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    >
                        A brief screening tool for PTSD symptoms in the past month.
                    </motion.p>
                </div>

                {/* Question Section */}
                <div className="flex flex-col items-start p-0 gap-3 sm:gap-4 lg:gap-5 w-full h-auto flex-none order-1 self-stretch grow-0">
                    {/* Progress Bar */}
                    <div className="flex flex-col items-start p-0 gap-1 sm:gap-1.5 lg:gap-2 w-full h-auto flex-none order-0 self-stretch grow-0">
                        <motion.div
                            className="w-full h-1.5 sm:h-2 bg-white rounded-[49px] flex-none order-0 self-stretch grow-0 relative overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                className="absolute h-1.5 sm:h-2 bg-[#FFCF6C] rounded-[49px]"
                                style={{ width: `${progress}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </motion.div>
                        <div className="flex flex-row items-center p-0 gap-1.5 sm:gap-2 w-full h-auto flex-none order-1 self-stretch grow-0">
                            <motion.svg
                                className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-none cursor-pointer transition-opacity ${currentStep === 0 || isComplete ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                    }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={handlePrevious}
                                style={{ transform: 'rotate(180deg)' }}
                                whileHover={currentStep !== 0 && !isComplete ? { scale: 1.1 } : {}}
                                whileTap={currentStep !== 0 && !isComplete ? { scale: 0.9 } : {}}
                                transition={{ duration: 0.15 }}
                            >
                                <path d="M5 12H19" stroke="#191C1C" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 5L19 12L12 19" stroke="#191C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                            <motion.span
                                className="font-['Lato'] font-light text-sm sm:text-base lg:text-lg leading-[150%] text-[#191C1C]"
                                key={currentStep}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                {isTraumaStep ? 'Question 1 of ' + (1 + symptomQuestions.length) :
                                    `Question ${currentStep + 1} of ${1 + symptomQuestions.length}`}
                            </motion.span>
                            <div className="flex-1"></div>
                        </div>
                    </div>

                    {/* Question and Options - Unified animation */}
                    <div className="w-full h-auto flex-none order-1 self-stretch grow-0 overflow-visible">
                        {isComplete && hasTraumaExposure === false ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-start p-0 gap-3 sm:gap-4 w-full"
                            >
                                <h2 className="w-full h-auto font-['Lora'] font-semibold text-base sm:text-lg lg:text-2xl leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0">
                                    Thank you for completing the screening.
                                </h2>
                                <p className="w-full font-['Lato'] text-sm sm:text-base text-[#191C1C]">
                                    You indicated you have not experienced any traumatic events. Your score is 0.
                                </p>
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={isTraumaStep ? 'trauma' : currentQuestion.id}
                                    custom={direction}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="flex flex-col items-start p-0 gap-3 sm:gap-4 lg:gap-5 w-full"
                                >
                                    {/* Question */}
                                    <h2 className="w-full h-auto font-['Lora'] font-semibold text-base sm:text-lg lg:text-2xl leading-[102.08%] text-[#191C1C] flex-none order-0 self-stretch grow-0">
                                        {isTraumaStep ? traumaQuestion.text : currentQuestion.text}
                                    </h2>

                                    {/* Options */}
                                    <div className="flex flex-col items-start p-0 gap-1.5 sm:gap-2 lg:gap-2.5 w-full h-auto flex-none order-1 self-stretch grow-0">
                                        {isTraumaStep ? (
                                            <>
                                                <div
                                                    className={`w-full box-border flex flex-row items-center p-2 sm:p-2.5 lg:p-3 px-3 sm:px-4 gap-2 sm:gap-2.5 min-h-[36px] sm:min-h-[42px] lg:min-h-[48px] border rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-150 border-[#191C1C] hover:border-[#FFCF6C] hover:bg-[#FFCF6C] hover:bg-opacity-30`}
                                                    onClick={() => handleTraumaResponse(true)}
                                                >
                                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-none order-0 grow-0 relative">
                                                        <div className="absolute w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] left-[2px] top-[2px] rounded-full border border-[#191C1C]" />
                                                    </div>
                                                    <span className="flex-1 h-auto font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[102.08%] text-[#191C1C]">
                                                        Yes
                                                    </span>
                                                </div>
                                                <div
                                                    className={`w-full box-border flex flex-row items-center p-2 sm:p-2.5 lg:p-3 px-3 sm:px-4 gap-2 sm:gap-2.5 min-h-[36px] sm:min-h-[42px] lg:min-h-[48px] border rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-150 border-[#191C1C] hover:border-[#FFCF6C] hover:bg-[#FFCF6C] hover:bg-opacity-30`}
                                                    onClick={() => handleTraumaResponse(false)}
                                                >
                                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-none order-0 grow-0 relative">
                                                        <div className="absolute w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] left-[2px] top-[2px] rounded-full border border-[#191C1C]" />
                                                    </div>
                                                    <span className="flex-1 h-auto font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[102.08%] text-[#191C1C]">
                                                        No
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div
                                                    className={`w-full box-border flex flex-row items-center p-2 sm:p-2.5 lg:p-3 px-3 sm:px-4 gap-2 sm:gap-2.5 min-h-[36px] sm:min-h-[42px] lg:min-h-[48px] border rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-150 border-[#191C1C] hover:border-[#FFCF6C] hover:bg-[#FFCF6C] hover:bg-opacity-30`}
                                                    onClick={() => handleSymptomResponse(currentQuestionIndex, true)}
                                                >
                                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-none order-0 grow-0 relative">
                                                        <div className="absolute w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] left-[2px] top-[2px] rounded-full border border-[#191C1C]" />
                                                    </div>
                                                    <span className="flex-1 h-auto font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[102.08%] text-[#191C1C]">
                                                        Yes
                                                    </span>
                                                </div>
                                                <div
                                                    className={`w-full box-border flex flex-row items-center p-2 sm:p-2.5 lg:p-3 px-3 sm:px-4 gap-2 sm:gap-2.5 min-h-[36px] sm:min-h-[42px] lg:min-h-[48px] border rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-150 border-[#191C1C] hover:border-[#FFCF6C] hover:bg-[#FFCF6C] hover:bg-opacity-30`}
                                                    onClick={() => handleSymptomResponse(currentQuestionIndex, false)}
                                                >
                                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-none order-0 grow-0 relative">
                                                        <div className="absolute w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] left-[2px] top-[2px] rounded-full border border-[#191C1C]" />
                                                    </div>
                                                    <span className="flex-1 h-auto font-['Lato'] font-semibold text-sm sm:text-base lg:text-lg leading-[102.08%] text-[#191C1C]">
                                                        No
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Leave Test Button */}
                    {!isComplete && (
                        <div className="flex flex-row justify-end items-center w-full h-auto flex-none order-2 self-stretch grow-0 mt-0">
                            <motion.div
                                className="flex flex-row items-center p-0 gap-1.5 sm:gap-2 lg:gap-3 h-4 sm:h-5 lg:h-6 flex-none cursor-pointer"
                                onClick={onLeaveTest}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                            >
                                <span className="font-['Lato'] font-semibold text-xs sm:text-sm lg:text-base leading-[102.08%] text-[#191C1C] flex-none">
                                    Leave Test
                                </span>
                                <motion.svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rotate-180 flex-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    whileHover={{ x: -3 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#CF0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 17L21 12L16 7" stroke="#CF0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 12H9" stroke="#CF0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PTSDQuestions;