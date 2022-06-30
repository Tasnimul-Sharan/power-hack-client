import React from "react";
import Header from "../Shared/Header";
import MyBillings from "./MyBillings";
import PaginationPages from "./PaginationPages";

const Home = () => {
  return (
    <div>
      <Header />
      <MyBillings />
    </div>
  );
};

export default Home;
