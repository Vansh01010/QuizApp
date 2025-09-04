import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import he from "he";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch 10 questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        const data = await res.json();

        const formatted = data.results.map((q, i) => {
          const options = [...q.incorrect_answers];
          const randIndex = Math.floor(Math.random() * 4);
          options.splice(randIndex, 0, q.correct_answer);
          return {
            id: i,
            question: he.decode(q.question),
            options: options.map((opt) => he.decode(opt)),
            correct: he.decode(q.correct_answer),
          };
        });

        setQuestions(formatted);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/result", { state: { questions, answers } });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white bg-[#212529]">
        Loading...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-white bg-[#212529]">
        No questions found.
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#212529] text-navy overflow-hidden">
      {/* Question counter under Navbar */}
      <div className="bg-[#212529] text-white text-lg font-semibold py-3 flex justify-center">
        Question {currentIndex + 1} of {questions.length}
      </div>

      {/* Quiz Container */}
      <div className="flex flex-col flex-grow items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <QuestionCard
            question={questions[currentIndex]}
            selected={answers[currentIndex]}
            onSelect={handleAnswer}
            fixedHeight={true}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-between w-full max-w-2xl mt-6">
          {/* Previous Button */}
          {currentIndex > 0 ? (
            <div className="bg-white rounded-full shadow-md p-1">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-white text-[#212529] font-semibold rounded-full flex items-center gap-2 hover:bg-gray-200 transition cursor-pointer"
              >
                ← Previous
              </button>
            </div>
          ) : (
            <div></div>
          )}

          {/* Next Button */}
          <div className="bg-white rounded-full shadow-md p-1">
            <button
              onClick={handleNext}
              disabled={!answers[currentIndex]}
              className={`px-6 py-2 font-semibold rounded-full flex items-center gap-2 transition ${
                answers[currentIndex]
                  ? "bg-white text-[#212529] hover:bg-gray-200 cursor-pointer"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {currentIndex === questions.length - 1 ? "Finish →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
