import Quiz from "./Quiz/Quiz";
import Review from "./Review/Review";
import StartPage from "./Start/StartPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
