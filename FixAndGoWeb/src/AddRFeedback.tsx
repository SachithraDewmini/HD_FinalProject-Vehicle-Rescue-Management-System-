import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

const AddRFeedback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get rentalownerid and name from location state
  const { rentalownerid, name } = location.state || {};

  // Initialize states
  const [description, setDescription] = useState<string>(""); // Feedback description
  const [rating, setRating] = useState<number>(0); // Rating from 1 to 5

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure a rating is selected
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    // Check if rentalownerid and name exist
    if (!rentalownerid || !name) {
      alert("Error: Missing rental owner ID or user name.");
      return;
    }

    try {
      // Add feedback to Firestore
      const feedbackRef = collection(db, "rentalownerFeedbacks");
      await addDoc(feedbackRef, {
        rentalownerId: rentalownerid, // Rental owner ID
        description: description, // Feedback description
        rating: rating, // Rating (1-5)
        username: name, // Username of the customer
        timestamp: new Date(), // Timestamp of feedback
      });

      alert("Feedback submitted successfully!");
      navigate("/crview"); // Navigate back after submission
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Error: " + error.message);
    }
  };

  // Handle star click to set the rating
  const handleStarClick = (starIndex: number) => {
    setRating(starIndex); // Set the rating to the clicked star's index
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300">
      <Link
                            to="/crview"
                            className="self-start mb-4 ml-6 text-blue-700 hover:underline flex items-center"
                          >
                            ← Back
                          </Link>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Add Feedback</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        {/* Rating Section */}
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Rate the Service</h2>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <svg
                key={starIndex}
                onClick={() => handleStarClick(starIndex)} // Handle click on a star
                xmlns="http://www.w3.org/2000/svg"
                fill={starIndex <= rating ? "gold" : "gray"} // Color the star based on the rating
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer mx-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17.27l-5.18 3.73a1 1 0 01-1.45-1.05l1.09-6.36L2.18 9.05a1 1 0 01.55-1.7l6.4-.93 2.87-5.82a1 1 0 011.8 0l2.87 5.82 6.4.93a1 1 0 01.55 1.7l-4.62 4.53 1.09 6.36a1 1 0 01-1.45 1.05L12 17.27z"
                />
              </svg>
            ))}
          </div>
        </div>

        {/* Feedback Text Area */}
        <div className="mb-4">
          <textarea
            placeholder="Enter your feedback"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 px-4 py-2 border rounded-md text-gray-900"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default AddRFeedback;
