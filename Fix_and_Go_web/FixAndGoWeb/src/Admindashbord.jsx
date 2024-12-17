import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./Firebaseconfig";

const AdminDashboard = () => {
  const [selectedTable, setSelectedTable] = useState("Customer");
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const tables = ["Customer", "Mechanic", "RentalOwner", "Troller"];

  // Function to fetch table data
  const fetchTableData = async (tableName) => {
    try {
      setError(null); // Clear any previous error
      const tableRef = collection(db, tableName);
      const snapshot = await getDocs(tableRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
      setTableData([]);
    }
  };

  // Function to delete a record
  const handleDelete = async (id) => {
    try {
      const tableRef = doc(db, selectedTable, id); // Reference to the document
      await deleteDoc(tableRef); // Delete the document
      setTableData((prevData) => prevData.filter((row) => row.id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete record. Please try again.");
    }
  };

  useEffect(() => {
    fetchTableData(selectedTable);
  }, [selectedTable]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Table Selection Dropdown */}
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>

        {/* Error Message */}
        {error ? (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        ) : tableData.length === 0 ? (
          <p className="text-center text-gray-600">
            No data available for the selected table.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                {Object.keys(tableData[0]).map((key) => (
                  <th key={key} className="py-3 px-4 text-left">
                    {key}
                  </th>
                ))}
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  {Object.values(row).map((value, index) => (
                    <td key={index} className="py-2 px-4 border border-gray-200">
                      {value}
                    </td>
                  ))}
                  <td className="py-2 px-4 border border-gray-200">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
