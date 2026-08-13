// SocialAnxietyTest.jsx
import React, { useState } from "react";
import SocialAnxietyLanding from "./SocialAnxietyLanding";
import SocialAnxietyQuestions from "./SocialAnxietyQuestions";
import SocialAnxietyResults from "./SocialAnxietyResults";
import PTSDLanding from "./PTSD/PTSDLanding";
import PTSDQuestions from "./PTSD/PTSDQuestions";
import PTSDTResults from "./PTSD/PTSDTResults";

const SocialAnxietyTest = () => {
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [answers, setAnswers] = useState({});

    // For PTSD test
    const [currentTest, setCurrentTest] = useState('social-anxiety'); // 'social-anxiety' or 'ptsd'

    const handleStartTest = () => {
        setTestStarted(true);
    };

    const handleLeaveTest = () => {
        setTestStarted(false);
        setTestCompleted(false);
        setAnswers({});
    };

    const handleCompleteTest = (finalAnswers) => {
        setAnswers(finalAnswers);
        setTestCompleted(true);
    };

    const handleRetake = () => {
        setTestCompleted(false);
        setTestStarted(true);
        setAnswers({});
    };

    const handleLearnMore = () => {
        alert('Learn more about this test');
    };

    const handleSwitchToPTSD = () => {
        setCurrentTest('ptsd');
        setTestStarted(false);
        setTestCompleted(false);
        setAnswers({});
    };

    const handleSwitchToSocialAnxiety = () => {
        setCurrentTest('social-anxiety');
        setTestStarted(false);
        setTestCompleted(false);
        setAnswers({});
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F0E8] p-4">
            {/* Test Selector - Optional, can be removed if you want separate routes */}
            {!testStarted && !testCompleted && (
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={handleSwitchToSocialAnxiety}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${currentTest === 'social-anxiety'
                            ? 'bg-[#FFCF6C] text-[#191C1C]'
                            : 'bg-white/50 text-[#191C1C] hover:bg-white'
                            }`}
                    >
                        Social Anxiety Test
                    </button>
                    <button
                        onClick={handleSwitchToPTSD}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${currentTest === 'ptsd'
                            ? 'bg-[#FFCF6C] text-[#191C1C]'
                            : 'bg-white/50 text-[#191C1C] hover:bg-white'
                            }`}
                    >
                        PTSD Test
                    </button>
                </div>
            )}

            {!testStarted && !testCompleted && currentTest === 'social-anxiety' && (
                <SocialAnxietyLanding onStartTest={handleStartTest} />
            )}
            {!testStarted && !testCompleted && currentTest === 'ptsd' && (
                <PTSDLanding onStartTest={handleStartTest} />
            )}

            {testStarted && !testCompleted && currentTest === 'social-anxiety' && (
                <SocialAnxietyQuestions
                    onLeaveTest={handleLeaveTest}
                    onComplete={handleCompleteTest}
                />
            )}
            {testStarted && !testCompleted && currentTest === 'ptsd' && (
                <PTSDQuestions
                    onLeaveTest={handleLeaveTest}
                    onComplete={handleCompleteTest}
                />
            )}

            {testCompleted && currentTest === 'social-anxiety' && (
                <SocialAnxietyResults
                    answers={answers}
                    onRetake={handleRetake}
                    onLearnMore={handleLearnMore}
                />
            )}
            {testCompleted && currentTest === 'ptsd' && (
                <PTSDTResults
                    answers={answers}
                    onRetake={handleRetake}
                    onLearnMore={handleLearnMore}
                />
            )}
        </div>
    );
};

export default SocialAnxietyTest;