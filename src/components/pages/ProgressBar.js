function ProgressBar({ progress }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700">
          Registration Progress
        </span>

        <span className="font-semibold text-blue-600">
          {progress}%
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;