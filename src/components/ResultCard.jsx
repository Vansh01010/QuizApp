function ResultCard({ question, selected, index }) {
  const isCorrect = selected === question.correct;

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2
        className="font-semibold mb-2"
        dangerouslySetInnerHTML={{ __html: `${index}. ${question.question}` }}
      />

      <p
        className={`mb-1 ${
          isCorrect ? "text-green-600" : "text-red-600"
        }`}
      >
        Your answer:{" "}
        <span dangerouslySetInnerHTML={{ __html: selected || "Not answered" }} />
      </p>

      {!isCorrect && (
        <p className="text-green-600">
          Correct answer:{" "}
          <span dangerouslySetInnerHTML={{ __html: question.correct }} />
        </p>
      )}
    </div>
  );
}

export default ResultCard;
