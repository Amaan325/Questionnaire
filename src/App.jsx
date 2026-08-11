
import SocialAnxietyTest from './pages/SocialAnxietyTest';

const quizzes = {
  'social-anxiety': SocialAnxietyTest,
};

const App = ({ quiz = 'social-anxiety' }) => {
  const QuizComponent = quizzes[quiz] ;

  return (
    <div>
      <QuizComponent />
    </div>
  );
}

export default App;
