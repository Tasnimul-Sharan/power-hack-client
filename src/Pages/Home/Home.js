import React from "react";
import Header from "../Shared/Header";
import MyBillings from "./MyBillings";

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Home</h1>
      <MyBillings />
    </div>
  );
};

export default Home;
