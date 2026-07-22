import React, { useState } from "react";
import SocialAnxietyLanding from "./SocialAnxietyLanding";
import SocialAnxietyQuestions from "./SocialAnxietyQuestions";
import SocialAnxietyResults from "./SocialAnxietyResults";

const SocialAnxietyTest = () => {
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [answers, setAnswers] = useState({});

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F0E8]">
            {!testStarted && !testCompleted && (
                <SocialAnxietyLanding onStartTest={handleStartTest} />
            )}
            {testStarted && !testCompleted && (
                <SocialAnxietyQuestions
                    onLeaveTest={handleLeaveTest}
                    onComplete={handleCompleteTest}
                />
            )}
            {testCompleted && (
                <SocialAnxietyResults
                    answers={answers}
                    onRetake={handleRetake}
                    onLearnMore={handleLearnMore}
                />
            )}
        </div>
    );
};

export default SocialAnxietyTest;