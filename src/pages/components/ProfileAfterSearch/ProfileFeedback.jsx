import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProfileFeedback = ({ centreId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [name, setName] = useState(""); // State for name
  const [feedback, setFeedback] = useState(""); // State for feedback
  const [submitting, setSubmitting] = useState(false); // State for form submission loading

  // Fetch feedback data when the centreId changes
  useEffect(() => {
    if (!centreId) return;

    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://deaddiction-project-backend.onrender.com/api/centre/${centreId}/feedback`
        );
        setFeedbacks(response.data.feedbacks);
      } catch (err) {
        setError("Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [centreId]);

  // Handle feedback form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !feedback) return;

    try {
      setSubmitting(true);
      const newFeedback = { name, feedback };

      // Send POST request to submit feedback
      const response = await axios.post(
        `https://deaddiction-project-backend.onrender.com/api/centre/${centreId}/feedback`,
        newFeedback
      );

      // Update the state with the new feedback
      setFeedbacks((prev) => [response.data.feedback, ...prev]);

      // Clear the form fields
      setName("");
      setFeedback("");
    } catch (err) {
      setError("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleShowMore = () => {
    setShowAllFeedback((prev) => !prev);
  };

  const displayedFeedbacks = showAllFeedback
    ? feedbacks
    : feedbacks.slice(0, 2);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-8 bg-[#f4f7fc] p-8 rounded-lg shadow-lg">
      {/* Feedback Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-sky-700">Center Feedback</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#458FF6]"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="feedback"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#458FF6] h-32"
              placeholder="Write your feedback here"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full text-white text-lg font-semibold py-3 rounded-lg ${
              submitting ? "bg-gray-500" : "bg-[#458FF6] hover:bg-[#367bd7]"
            } transition duration-300`}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      {/* Feedback Display */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-sky-700 mb-4">
          User Feedback
        </h2>
        {loading ? (
          <p className="text-gray-500 text-lg">Loading feedback...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-500 text-lg">No feedback available yet.</p>
        ) : (
          <ul className="space-y-6">
            {displayedFeedbacks.map((fb, index) => (
              <li
                key={index}
                className="bg-[#f9fafc] p-4 rounded-lg shadow-sm border-l-4 border-[#458FF6]"
              >
                <p className="text-gray-700 text-lg mb-2">
                  <span className="font-semibold">Name:</span> {fb.name}
                </p>
                <p className="text-gray-700 text-lg mb-2">
                  <span className="font-semibold">Feedback:</span> {fb.feedback}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">Date:</span> {fb.date}
                </p>
              </li>
            ))}
          </ul>
        )}
        {feedbacks.length > 2 && (
          <div
            className="flex items-center justify-center mt-4 cursor-pointer text-[#458FF6] hover:text-[#367bd7] transition duration-300"
            onClick={toggleShowMore}
          >
            <span className="text-lg font-semibold">
              {showAllFeedback ? "Show Less" : "See More"}
            </span>
            {showAllFeedback ? (
              <FiChevronUp className="ml-2 text-xl" />
            ) : (
              <FiChevronDown className="ml-2 text-xl" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFeedback;
