import { FaTools, FaClock, FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center transform transition-all hover:scale-105 duration-300">
        {/* Construction Icon */}
        <div className="flex justify-center mb-6">
          <FaTools className="text-6xl text-blue-500 animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Under Construction
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-6">
          We're working hard to bring you something amazing! This page is
          currently under construction and will be available soon.
        </p>

        {/* Coming Soon Message with Clock Icon */}
        <div className="flex items-center justify-center gap-2 text-blue-600 mb-8">
          <FaClock className="text-xl" />
          <span className="text-xl font-semibold">Coming Soon!</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-blue-600 h-2.5 rounded-full animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 hover:cursor-pointer"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:cursor-pointer"
          >
            <FaHome />
            <span>Go Home</span>
          </button>
        </div>

        {/* Call to Action */}
        <p className="text-gray-500">
          Check back later or explore other parts of our site!
        </p>
      </div>
    </div>
  );
}
