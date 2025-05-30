import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mechanic from "./Images/Mechanic.png";
import RentalOwner from "./Images/RentalOwner.png";
import Troller from "./Images/Troller.png";

// Service Interface
interface Service {
  image: string;
  alt: string;
  link: { pathname: string; state?: { name?: string } } | string;
  label: string;
}

const services: Service[] = [
  {
    image: Mechanic,
    alt: "Mechanic services icon",
    link: { pathname: "/cmview", state: { name: localStorage.getItem("name") || "" } },
    label: "Mechanic Services",
  },
  {
    image: Troller,
    alt: "Troller services icon",
    link: { pathname: "/ctview", state: { name: localStorage.getItem("name") || "" } },
    label: "Troller Services",
  },
  {
    image: RentalOwner,
    alt: "Rental owner services icon",
    link: { pathname: "/crview", state: { name: localStorage.getItem("name") || "" } },
    label: "Rental Owner Services",
  },
];

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
    <img
      src={service.image}
      alt={service.alt}
      className="w-full h-48 object-cover"
      onError={(e) => ((e.target as HTMLImageElement).src = FallbackImage)}
    />
    <div className="p-4 text-center">
      <Link
        to={service.link}
        className="inline-block text-white bg-orange-500 hover:bg-orange-600 transition-colors py-2 px-4 rounded-md text-lg font-semibold"
      >
        {service.label}
      </Link>
    </div>
  </div>
);

const CustomerView: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto p-4">
        {/* Display the user's name */}
        {userName && (
          <h2 className="text-xl font-bold mb-8 text-gray-800 text-center">
            Welcome, {userName}!
          </h2>
        )}

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Our Services</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Explore the range of services we offer to meet all your needs!
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
