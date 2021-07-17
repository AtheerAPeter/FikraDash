import Cookies from "js-cookie";

const URL = "https://prisma-shop.herokuapp.com/v1";

export const ApiLogin = (info, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch(`${URL}/admin/login`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(info),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result.data, null);
      return callback(null, "error occured");
    })
    .catch((error) => console.log("error", error));
};

export const ApiFood = async (callback) => {
  const token = await Cookies.get("adminToken");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/product`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status) return callback(result.data);
        return callback(null, "Error Occured");
      })
      .catch((error) => console.log("error", error));
  }
};
