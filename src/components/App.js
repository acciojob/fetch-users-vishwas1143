import React, { useState, useCallback } from "react";
import axios from "axios";

import "./../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // Needed to detect initial state

  const getUsers = () => {
    setLoading(true);
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data.data);
        setHasFetched(true);
      })
      .catch((err) => {
        setUsers([]);
        setHasFetched(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button className="btn" onClick={getUsers}>
        Get User List
      </button>

      {loading && <p>Loading users...</p>}

      {!loading && hasFetched && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img src={user.avatar} alt="avatar" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
