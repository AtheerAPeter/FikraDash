import Cookies from "js-cookie";
import { useEffect } from "react";
import "antd/dist/antd.css";
import "../styles/globals.scss";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
const progress = new ProgressBar({
  size: 3,
  color: "#1876d1",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setAndGet();
  }, []);

  const setAndGet = async () => {
    const token = await Cookies.get("adminToken");
    if (!token && window.location.pathname !== "/login")
      window.location.href = "/login";
    else if (token && window.location.pathname == "/login")
      window.location.href = "/";
  };

  return <Component {...pageProps} />;
}

export default MyApp;
