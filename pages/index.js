import { Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import Link from "next/link";

const Home = () => {
  return (
    <div className="home-container">
      <MainLayout />

      <div className="home-content">
        <Link href="/products">
          <div className="card products">
            <img src="./images/food.svg" alt="" />
            <h1>Food </h1>
          </div>
        </Link>
        <Link href="/users">
          <div className="card users">
            {" "}
            <img src="./images/users.svg" alt="" />
            <h1>Manage Users</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
