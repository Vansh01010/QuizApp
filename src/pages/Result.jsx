import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, answers } = location.state || { questions: [], answers: {} };

  if (!questions.length) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#212529] text-white">
        <p>No results found. Please take the quiz first.</p>
      </div>
    );
  }

  // Calculate score
  const score = questions.reduce((acc, q, i) => {
    return answers[i] === q.correct ? acc + 1 : acc;
  }, 0);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#212529] text-white overflow-y-auto">
      {/* Result Container */}
      <div className="flex flex-col items-center px-4 py-6">
        <div className="bg-white text-[#212529] rounded-2xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
          <p className="text-lg mb-6">
            You scored <span className="font-bold">{score}</span> out of{" "}
            {questions.length}
          </p>

          {/* Restart Buttons */}
          <div className="flex gap-4 mt-4">
            <div className="bg-white rounded-full shadow-md p-1">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-white text-[#212529] font-semibold rounded-full hover:bg-gray-200 transition cursor-pointer"
              >
                Go to Home →
              </button>
            </div>

            <div className="bg-white rounded-full shadow-md p-1">
              <button
                onClick={() => navigate("/quiz")}
                className="px-6 py-2 bg-white text-[#212529] font-semibold rounded-full hover:bg-gray-200 transition cursor-pointer"
              >
                Try Again ↻
              </button>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8 w-full max-w-3xl space-y-6">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;

            return (
              <div
                key={i}
                className="bg-white text-[#212529] rounded-xl shadow-md p-6"
              >
                <h3 className="font-semibold mb-3">
                  {i + 1}. {q.question}
                </h3>

                {/* User Answer */}
                <p
                  className={`flex items-center gap-2 mb-2 ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect ? "✅" : "❌"} Your Answer:{" "}
                  {userAnswer ? userAnswer : <span className="italic">No answer</span>}
                </p>

                {/* Correct Answer (only if wrong) */}
                {!isCorrect && (
                  <p className="flex items-center gap-2 text-green-600">
                    ✅ Correct Answer: {q.correct}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;
