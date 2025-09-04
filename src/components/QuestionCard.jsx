function QuestionCard({ question, selected, onSelect, fixedHeight }) {
  if (!question) return null;

  return (
    <div
      className={`bg-white shadow-lg rounded-2xl p-6 ${
        fixedHeight ? "h-[320px]" : ""
      } flex flex-col justify-between`}
    >
      <h2 className="text-lg font-semibold text-[#212529] mb-4">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full px-4 py-2 text-left border rounded-lg transition ${
              selected === option
                ? "bg-gray-200 border-gray-400"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
