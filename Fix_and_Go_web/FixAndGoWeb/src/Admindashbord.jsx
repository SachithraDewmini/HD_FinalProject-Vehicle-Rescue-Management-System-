import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./Firebaseconfig";

const AdminDashboard = () => {
  const [selectedTable, setSelectedTable] = useState("users");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For displaying filtered data
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [searchType, setSearchType] = useState("userId"); // Search by userId or name/userName
  const [error, setError] = useState(null);

  const tables = [
    "users",
    "mechanic",
    "rentalowner",
    "troller",
    "mechanicFeedbacks",
    "rentalownerFeedbacks",
    "trollerFeedbacks",
  ];

  // Fields to display for each table
  const tableFields = {
    users: ["id", "email", "name", "role", "userId"],
    mechanic: ["id", "availability", "contactNumber", "location", "serviceName", "userId", "userName", "vehicleType"],
    rentalowner: [
      "id",
      "availability",
      "condition",
      "contactNumber",
      "location",
      "noOfSeats",
      "serviceName",
      "userId",
      "userName",
      "value",
      "vehicleBrandName",
      "vehicleType",
    ],
    troller: [
      "id",
      "availability",
      "contactNumber",
      "location",
      "serviceName",
      "towingcapacity",
      "userId",
      "userName",
      "value",
      "vehicleTypes",
    ],
    mechanicFeedbacks: ["id", "description", "mechanicId", "rating", "username"],
    rentalownerFeedbacks: ["id", "description", "rentalownerId", "rating", "username"],
    trollerFeedbacks: ["id", "description", "trollerId", "rating", "username"],
  };

  // Function to fetch table data
  const fetchTableData = async (tableName) => {
    try {
      setError(null); // Clear any previous error
      const tableRef = collection(db, tableName);
      const snapshot = await getDocs(tableRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTableData(data);
      setFilteredData(data); // Set initial filtered data to full data
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
      setTableData([]);
      setFilteredData([]);
    }
  };

  // Function to delete a record
  const handleDelete = async (id) => {
    try {
      const tableRef = doc(db, selectedTable, id); // Reference to the document
      await deleteDoc(tableRef); // Delete the document
      setTableData((prevData) => prevData.filter((row) => row.id !== id)); // Update UI
      setFilteredData((prevData) => prevData.filter((row) => row.id !== id)); // Update filtered data
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete record. Please try again.");
    }
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query
    if (!query) {
      // If search query is empty, reset filtered data
      setFilteredData(tableData);
      return;
    }

    // Determine search key based on table and searchType
    let searchKey;
    if (searchType === "userId") {
      searchKey = "userId";
    } else if (searchType === "name") {
      searchKey = selectedTable === "users" ? "name" : "userName";
    } else if (searchType === "vehicleType" || searchType === "vehicleTypes") {
      searchKey = searchType;
    } else if (searchType === "username") {
      searchKey = "username";
    }

    // Filter table data
    const filtered = tableData.filter((row) =>
      row[searchKey]?.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchTableData(selectedTable);
    setSearchType(
      ["mechanicFeedbacks", "rentalownerFeedbacks", "trollerFeedbacks"].includes(selectedTable)
        ? "username"
        : "userId"
    ); // Set default search type
    setSearchQuery(""); // Clear search query when changing table
  }, [selectedTable]);

  return (
    <div className="min-h-screen bg-light-gray py-10 flex justify-center items-center">
      <div className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <div className="mb-6">
          {/* Table Selection Dropdown */}
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            {tables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>

          {/* Search Type Dropdown */}
          {["mechanicFeedbacks", "rentalownerFeedbacks", "trollerFeedbacks"].includes(selectedTable) ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by username
              </label>
            </div>
          ) : (
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="userId">Search by userId</option>
              <option value="name">
                {selectedTable === "users" ? "Search by name" : "Search by userName"}
              </option>
              {["mechanic", "rentalowner"].includes(selectedTable) && (
                <option value="vehicleType">Search by vehicleType</option>
              )}
              {selectedTable === "troller" && (
                <option value="vehicleTypes">Search by vehicleTypes</option>
              )}
            </select>
          )}

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search by ${searchType} in ${selectedTable}`}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          {/* Error Message */}
          {error ? (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          ) : filteredData.length === 0 ? (
            <p className="text-center text-gray-600">
              No data available for the selected table or matching search query.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-orange-600 text-white">
                    {tableFields[selectedTable].map((field) => (
                      <th key={field} className="py-3 px-4 text-left">
                        {field}
                      </th>
                    ))}
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto max-h-80">
                  {filteredData.map((row) => (
                    <tr
                      key={row.id}
                      className="even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      {tableFields[selectedTable].map((field) => (
                        <td key={field} className="py-2 px-4 border border-gray-200">
                          {row[field] || "N/A"}
                        </td>
                      ))}
                      <td className="py-2 px-4 border border-gray-200">
                        <button
                          className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
