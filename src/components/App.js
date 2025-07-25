import React, { useState, useCallback } from "react";
import axios from "axios";

import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState([]);
  const getData = useCallback(() => {
    try {
      axios
        .get("https://reqres.in/api/users", {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        })

        .then((d) => setData(d.data.data));
    } catch (e) {
      console.error(e);
    }
  }, []);
  console.log(data);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            {/* {id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth', avatar: 'https://reqres.in/img/faces/1-image.jpg'} */}
            {data.length !== 0 ? (
              data?.map((e) => {
                return (
                  <tr>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    <td>{e.email}</td>
                    <td>
                      <img
                        style={{
                          width: "100px",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                        src={e.avatar}
                        alt="Image"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>No data found</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
