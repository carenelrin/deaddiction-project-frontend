import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProfileFeedback = ({ centerId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!centerId) return;

    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://deaddiction-project-backend.onrender.com/api/search/${centerId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFeedbacks(data.feedbacks || []); // Corrected to extract 'feedbacks' array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [centerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !feedback.trim()) {
      setError("Both name and feedback are required!");
      return;
    }

    setSubmitting(true);

    const newFeedback = {
      name,
      feedback,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `https://deaddiction-project-backend.onrender.com/api/centre/${centerId}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
        }
      );

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }

      setFeedbacks((prev) => [newFeedback, ...prev]);
      setName("");
      setFeedback("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const displayedFeedbacks = showAllFeedback ? feedbacks : feedbacks.slice(0, 2);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-8 bg-[#f4f7fc] p-8 rounded-lg shadow-lg">
      {/* Feedback Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-sky-700">Center Feedback</h2>
        {error && <p className="text-red-500 text-lg mb-2">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#458FF6]"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Feedback</label>
            <textarea
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
        <h2 className="text-3xl font-semibold text-sky-700 mb-4">User Feedback</h2>
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
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(fb.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
        {feedbacks.length > 2 && (
          <div
            className="flex items-center justify-center mt-4 cursor-pointer text-[#458FF6] hover:text-[#367bd7]"
            onClick={() => setShowAllFeedback((prev) => !prev)}
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
