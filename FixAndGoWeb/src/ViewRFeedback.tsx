import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "./Firebaseconfig";

interface Feedback {
  id: string;
  description: string;
  rating: number;
  username?: string; // Optional field for reviewer name
  timestamp?: { seconds: number; nanoseconds: number }; // Firestore timestamp
}

const ViewRFeedback: React.FC = () => {
  const location = useLocation();
  const { rentalownerid } = location.state || {};

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackRef = collection(db, "rentalownerFeedbacks");
        const feedbackQuery = query(feedbackRef, where("rentalownerId", "==", rentalownerid));
        const feedbackSnapshot = await getDocs(feedbackQuery);

        const feedbackData: Feedback[] = feedbackSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];

        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError("Failed to load feedbacks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [rentalownerid]);

  if (loading) {
    return <div className="text-center text-xl py-10 text-white">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 py-10">
       <Link
                                  to="/crview"
                                  className="self-start mb-4 ml-6 text-blue-700 hover:underline flex items-center"
                                >
                                  ← Back
                                </Link>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Feedback</h1>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-700">No feedback available for this rental owner.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white shadow-md rounded p-4">
                {/* Star Rating Display */}
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <svg
                      key={starIndex}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={starIndex <= feedback.rating ? "gold" : "gray"}
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

                {/* Feedback Timestamp */}
                {feedback.timestamp && (
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(feedback.timestamp.seconds * 1000).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRFeedback;
