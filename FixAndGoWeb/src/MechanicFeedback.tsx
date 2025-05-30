import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebaseconfig";

interface Feedback {
  id: string;
  description: string;
  rating: number;
  username: string; // Added username field
}

const MechanicFeedback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mechanicid } = location.state || {}; // Mechanic ID passed from the previous page

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackRef = collection(db, "mechanicFeedbacks");
        const feedbackQuery = query(feedbackRef, where("mechanicId", "==", mechanicid));
        const feedbackSnapshot = await getDocs(feedbackQuery);

        const feedbackData: Feedback[] = feedbackSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];

        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [mechanicid]);

  if (loading) {
    return <div className="text-center text-xl py-10 text-white">Loading feedback...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Feedback</h1>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-700">No feedback available for this mechanic.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white shadow-md rounded p-4">
                {/* Display Username */}
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Submitted by:</strong> {feedback.username}
                </div>

                {/* Star Rating Display */}
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <svg
                      key={starIndex}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={starIndex <= feedback.rating ? "gold" : "gray"} // Fill based on rating
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l-5.18 3.73a1 1 0 01-1.45-1.05l1.09-6.36L2.18 9.05a1 1 0 01.55-1.7l6.4-.93 2.87-5.82a1 1 0 011.8 0l2.87 5.82 6.4.93a1 1 0 01.55 1.7l-4.62 4.53 1.09 6.36a1 1 0 01-1.45 1.05L12 17.27z"
                      />
                    </svg>
                  ))}
                </div>

                {/* Feedback Description */}
                <p className="text-gray-900">{feedback.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/mview")}
          className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MechanicFeedback;
