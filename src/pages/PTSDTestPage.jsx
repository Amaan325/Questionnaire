import { useState } from "react";
import PTSDLanding from "../components/PTSD/PTSDLanding";
import PTSDQuestions from "../components/PTSD/PTSDQuestions";
import PTSDTResults from "../components/PTSD/PTSDTResults";

const PTSDTestPage = () => {
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
                <PTSDLanding onStartTest={handleStartTest} />
            )}

            {testStarted && !testCompleted && (
                <PTSDQuestions
                    onLeaveTest={handleLeaveTest}
                    onComplete={handleCompleteTest}
                />
            )}

            {testCompleted && (
                <PTSDTResults
                    answers={answers}
                    onRetake={handleRetake}
                    onLearnMore={handleLearnMore}
                />
            )}
        </div>
    );
};

export default PTSDTestPage;