import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";


const AdminDashboard = () => {
  const [selectedTable, setSelectedTable] = useState("Customer");
  const [tableData, setTableData] = useState([]);

  const tables = ["Customer", "Mechanic", "RentalOwner", "Troller"];

  const fetchTableData = async (tableName) => {
    try {
      const db = getFirestore();
      const tableRef = collection(db, tableName);
      const snapshot = await getDocs(tableRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    }
  };

  useEffect(() => {
    fetchTableData(selectedTable);
  }, [selectedTable]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <select
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
