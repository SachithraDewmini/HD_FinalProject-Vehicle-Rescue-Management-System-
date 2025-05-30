import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./Firebaseconfig";

const RentalOwnerView: React.FC = () => {
  const [rentalowners, setRentalowners] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const fetchRentalowners = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found in local storage.");
          setLoading(false);
          return;
        }

        const rentalownersRef = collection(db, "rentalowner");
        const q = query(rentalownersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const rentalownersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRentalowners(rentalownersList);
      } catch (error) {
        console.error("Error fetching rentalowner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalowners();
  }, []);

  const handleDelete = async (rentalownerId: string) => {
    try {
      const rentalownerRef = doc(db, "rentalowner", rentalownerId);
      await deleteDoc(rentalownerRef);
      setRentalowners(rentalowners.filter((rentalowner) => rentalowner.id !== rentalownerId));
      alert("Rental Owner deleted successfully");
    } catch (error) {
      console.error("Error deleting rentalowner:", error);
      alert("Failed to delete rentalowner");
    }
  };

  const openImageModal = (images: string[], index: number) => {
    setSelectedImage(images[index]);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return;

    // Find the rental owner that contains the selected image
    const rentalowner = rentalowners.find((ro) => ro.images && ro.images.includes(selectedImage));

    if (!rentalowner || !rentalowner.images) return;

    const totalImages = rentalowner.images.length;
    let newIndex = currentImageIndex;

    // Navigate to the next or previous image
    if (direction === "next") {
      newIndex = (currentImageIndex + 1) % totalImages;
    } else if (direction === "prev") {
      newIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImage(rentalowner.images[newIndex]);
  };

  return (
    <div className="container mx-auto p-4">
      {userName && <h2 className="text-xl font-bold mb-4">Welcome, {userName}!</h2>}

      <button className="primary-btn mb-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
        <Link to="/radd" state={{ userId: localStorage.getItem("userId"), name: localStorage.getItem("name") }}>
          Add Rental Owner
        </Link>
      </button>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : rentalowners.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No rental owners found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalowners.map((rentalowner) => (
            <div key={rentalowner.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {rentalowner.images && rentalowner.images.length > 0 && (
                <div className="flex justify-center items-center">
                  {rentalowner.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`image-${index}`}
                      className="w-32 h-32 object-cover m-2 cursor-pointer"
                      onClick={() => openImageModal(rentalowner.images, index)}
                    />
                  ))}
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{rentalowner.serviceName}</h3>
                <p className="text-sm text-gray-600"><strong>Location:</strong> {rentalowner.location}</p>
                <p className="text-sm text-gray-600"><strong>Vehicle Type:</strong> {Array.isArray(rentalowner.vehicleType) ? rentalowner.vehicleType.join(", ") : rentalowner.vehicleType}</p>
                <p className="text-sm text-gray-600"><strong>Vehicle Brand:</strong> {Array.isArray(rentalowner.vehicleBrandName) ? rentalowner.vehicleBrandName.join(", ") : rentalowner.vehicleBrandName}</p>
                <p className="text-sm text-gray-600"><strong>Number of Seats:</strong> {Array.isArray(rentalowner.noOfSeats) ? rentalowner.noOfSeats.join(", ") : rentalowner.noOfSeats}</p>
                <p className="text-sm text-gray-600"><strong>Condition:</strong> {Array.isArray(rentalowner.condition) ? rentalowner.condition.join(", ") : rentalowner.condition}</p>
                <p className="text-sm text-gray-600"><strong>Availability:</strong> {rentalowner.availability === "available" ? "Available" : "Not Available"}</p>
                <p className="text-sm text-gray-600"><strong>Value:</strong> {Array.isArray(rentalowner.value) ? rentalowner.value.join(", ") : rentalowner.value}</p>
                <p className="text-sm text-gray-600"><strong>Contact Number:</strong> {rentalowner.contactNumber}</p>
                <div className="mt-4 flex space-x-4">
                  <button className="primary-btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    <Link to="/redit" state={{ rentalowner }}>Edit</Link>
                  </button>
                  <button
                    className="primary-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(rentalowner.id)}
                  >
                    Delete
                  </button>
                  <button className="primary-btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                                                      <Link
                                                        to="/rfeed"
                                                        state={{
                                                          rentalownerid: rentalowner.id,                                       }}
                                                      >
                                                        View Feedback
                                                      </Link>
                                                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <button onClick={closeImageModal} className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2">X</button>
            <div className="flex justify-between items-center">
              <button
                className="bg-gray-600 text-white p-2 rounded-full"
                onClick={() => navigateImage("prev")}
              >
                Prev
              </button>
              <img src={selectedImage} alt="Selected" className="w-96 h-96 object-cover" />
              <button
                className="bg-gray-600 text-white p-2 rounded-full"
                onClick={() => navigateImage("next")}
              >
                Next
              </button>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={closeImageModal}
            >
              Back to Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalOwnerView;
