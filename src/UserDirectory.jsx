// UserDirectory.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch posts from the API
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Function to get total posts count for a user
  const getUserPostCount = (userId) => {
    return posts.filter((post) => post.userId === userId).length;
  };

  return (
    <div className="container border mt-3 shadow">
      <h1 className="text-center">User Directory</h1>
      {users.map((user) => (
        <div key={user.id} className="card shadow mt-3 mb-3">
          <div className="row">
            <div className="col-sm-10 m-2">
              Name :
              <Link to={`/user/${user.id}`} className="user-name">
                {user.name}
              </Link>
            </div>
            <div className="col align-self-end m-2">
              Total Posts: {getUserPostCount(user.id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDirectory;
