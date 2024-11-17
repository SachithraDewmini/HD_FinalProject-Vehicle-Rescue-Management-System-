import React, { useEffect, useState } from 'react';

const AdminDashbord = () => {
  // State to manage the selected role from the dropdown
  const [selectedRole, setSelectedRole] = useState('customer');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Sample data for different roles (replace this with actual backend data fetching)
  const users = [
    { userID: 'U001', fname: 'John', lname: 'Doe', email: 'john@example.com', contactnumber: '1234567890', role: 'customer' },
    { userID: 'U002', fname: 'Jane', lname: 'Smith', email: 'jane@example.com', contactnumber: '9876543210', role: 'mechanic' },
    { userID: 'U003', fname: 'Bob', lname: 'Johnson', email: 'bob@example.com', contactnumber: '5555555555', role: 'troller' },
    { userID: 'U004', fname: 'Alice', lname: 'Brown', email: 'alice@example.com', contactnumber: '4444444444', role: 'rental owner' }
  ];

  const customers = [
    { cusID: 'C001', fname: 'John', lname: 'Doe', email: 'john@example.com', contactnumber: '1234567890', vehicletype: 'Car' }
  ];

  const mechanics = [
    { MechanicID: 'M001', fname: 'Jane', lname: 'Smith', email: 'jane@example.com', contactnumber: '9876543210', address: '123 Main St', city: 'CityA', district: 'District1', bike: true, car: true, availability: 'Available' }
  ];

  const trollers = [
    { TID: 'T001', fname: 'Bob', lname: 'Johnson', email: 'bob@example.com', contactnumber: '5555555555', address: '456 Elm St', city: 'CityB', district: 'District2', vehicletype: 'Truck', capacity: '5 tons', availability: 'Available' }
  ];

  const rentalOwners = [
    { RID: 'R001', VehicletypeID: 'V001', vehicletype: 'SUV', num_vehicles: 3, rental_price_day: 100, availability: 'Available', image: 'https://via.placeholder.com/150' }
  ];

  // Function to handle role selection change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setSearchQuery('');
  };

  // Function to filter data based on role selection
  useEffect(() => {
    switch (selectedRole) {
      case 'customer':
        setFilteredData(customers);
        break;
      case 'mechanic':
        setFilteredData(mechanics);
        break;
      case 'troller':
        setFilteredData(trollers);
        break;
      case 'rental owner':
        setFilteredData(rentalOwners);
        break;
      default:
        setFilteredData([]);
        break;
    }
  }, [selectedRole]);

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>

      {/* Dropdown for Role Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold">Select Role:</label>
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="customer">Customer</option>
          <option value="mechanic">Mechanic</option>
          <option value="troller">Troller</option>
          <option value="rental owner">Rental Owner</option>
        </select>
      </div>

      {/* Display Filtered Data */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        {selectedRole === 'customer' && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Customer ID</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Contact Number</th>
                <th className="py-2 px-4 border-b">Vehicle Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer) => (
                <tr key={customer.cusID}>
                  <td className="py-2 px-4">{customer.cusID}</td>
                  <td className="py-2 px-4">{customer.fname}</td>
                  <td className="py-2 px-4">{customer.lname}</td>
                  <td className="py-2 px-4">{customer.email}</td>
                  <td className="py-2 px-4">{customer.contactnumber}</td>
                  <td className="py-2 px-4">{customer.vehicletype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedRole === 'mechanic' && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Mechanic ID</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Contact Number</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Availability</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((mechanic) => (
                <tr key={mechanic.MechanicID}>
                  <td className="py-2 px-4">{mechanic.MechanicID}</td>
                  <td className="py-2 px-4">{mechanic.fname}</td>
                  <td className="py-2 px-4">{mechanic.lname}</td>
                  <td className="py-2 px-4">{mechanic.email}</td>
                  <td className="py-2 px-4">{mechanic.contactnumber}</td>
                  <td className="py-2 px-4">{mechanic.address}</td>
                  <td className="py-2 px-4">{mechanic.city}</td>
                  <td className="py-2 px-4">{mechanic.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add similar tables for Troller and Rental Owner roles */}
      </div>
    </div>
  );
};

export default AdminDashbord;
