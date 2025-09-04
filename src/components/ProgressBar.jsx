function ProgressBar({ current, total }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all"
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
      <p className="text-sm mt-2 text-gray-600">
        Question {current} of {total}
      </p>
    </div>
  );
}

export default ProgressBar;
