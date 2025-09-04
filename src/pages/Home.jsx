import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#212529] text-white overflow-hidden">
      <h1 className="text-4xl font-bold mb-6">Welcome to QuizApp</h1>
      <p className="text-lg text-gray-300 mb-8">
        Test your knowledge with 10 exciting questions!
      </p>

      <Link
        to="/quiz"
        className="px-8 py-3 bg-white text-[#212529] font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
      >
        Go to the Quiz App →
      </Link>
    </div>
  );
}

export default Home;
