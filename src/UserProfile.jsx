// UserProfile.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [clockTime, setClockTime] = useState(null);
  const [clockRunning, setClockRunning] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user details from the API
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));

    // Fetch user's posts from the API
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching user posts:", error));
  }, [userId]);

  useEffect(() => {
    const fetchClockTime = async () => {
      try {
        // Fetch current time in Indian timezone
        const response = await axios.get("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        setClockTime(response.data.utc_datetime);
      } catch (error) {
        console.error("Error fetching clock time:", error);
      }
    };

    const interval = setInterval(() => {
      if (clockRunning) {
        fetchClockTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clockRunning]);

  const toggleClock = () => {
    setClockRunning(!clockRunning);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container border mt-3">
      <div className="row mt-3">
        <div className="col-sm-6">
          <button className="btn btn-block btn-primary">
            <Link to="/" className="text-white">
              Back
            </Link>
          </button>
        </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-sm">
              <h3 className="in-line">Current Time (IST)</h3>
            </div>
            <div className="col-sm">
              <p>{clockTime}</p>
            </div>
            <div className="col-sm">
              <button className="btn btn-block btn-danger" onClick={toggleClock}>
                {clockRunning ? "Pause" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User details */}
      <div className="border m-2">
        <h3 className="m-1">User Details</h3>
        <div className="m-2">
          <div><b>Name: </b> {user.name}</div>
          <div><b>Username:  </b> {user.username}</div>
          <div><b>Catch Phrase:</b> {user.company.catchPhrase}</div>
        </div>
        <div className="m-2">
          <div>
            <b>Address:</b> {user.address.city}, {user.address.street},{" "}
            {user.address.suite}
          </div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
        </div>
      </div>

      {/* User posts */}
      <div className="mt-3">
        <h3 className="text-center">{user.name} Posts</h3>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><b>{post.title}</b></h5>
                  <p className="card-text">{post.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
