import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("userName", userName);
    // sends the username and socket ID to the Node.js server
    socket.emit('newUser',{userName,socketID:socket.id})
    navigate("/chat");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2>技术交流版</h2>
      <label htmlFor="username">用户名</label>
      <input
        type="text"
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className='home__cta'>登录</button>
    </form>
  );
};

export default Home;