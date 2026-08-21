import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialAnxietyTestPage from './pages/SocialAnxietyTestPage';
import PTSDTestPage from './pages/PTSDTestPage';

function App() {
  return (
    <BrowserRouter basename="/Questionnaire">
      <Routes>
        <Route path="/social-anxiety-test" element={<SocialAnxietyTestPage />} />
        <Route path="/ptsd-test" element={<PTSDTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;