import React, { useState, useCallback } from "react";
import axios from "axios";

import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setData(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>OUTPUT</h2>
        <p>Blue Whales</p>
        <button
          style={{ backgroundColor: "#15778a" }}
          className="btn"
          onClick={getData}
        >
          Get User List
        </button>
      </div>

      <div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table style={{ width: "100vw", border: "0" }}>
            <thead style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        style={{
                          width: "100px",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
