import { Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const MainLayout = () => {
  const Router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    const admin = Cookies.get("admin");
    if (admin) setData(JSON.parse(admin));
  }, []);
  const logout = async () => {
    await Cookies.remove("adminToken");
    await Cookies.remove("admin");
    Router.push("/login");
  };
  const content = (
    <div>
      <Button onClick={logout} danger type="primary">
        Logout
      </Button>
    </div>
  );

  return (
    <nav>
      <div className="logo-wrapper">
        <img src="./icons/logoIcon.svg" alt="" />
        <h1 className="logo">FikraDash</h1>
      </div>
      <Popover content={content} trigger="click">
        <div className="avatar-wrapper">
          {data && <h1>{data.name}</h1>}
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </Popover>
    </nav>
  );
};

export default MainLayout;
