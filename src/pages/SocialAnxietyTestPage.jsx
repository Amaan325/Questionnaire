import { useState } from "react";
import SocialAnxietyLanding from "../components/SocialAnxiety/SocialAnxietyLanding";
import SocialAnxietyQuestions from "../components/SocialAnxiety/SocialAnxietyQuestions";
import SocialAnxietyResults from "../components/SocialAnxiety/SocialAnxietyResults";

const SocialAnxietyTestPage = () => {
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
        window.location.href = "/test";
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
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

export default SocialAnxietyTestPage;