const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", function (request, response) {
  if (request.body.basic) {
    const data = request.body.basic;
    getData(data).then((res) => response.send(res));
  }
  if (request.body.type === "post") {
    postData(request.body).then((res) => response.send(res));
  }
});

const getData = async (data) => {
  const res = await axios({
    url: "https://api.stage.targemy.com/v1/auth/login",
    method: "GET",
    headers: {
      Authorization: "Basic " + data,
      "Content-Type": "application/json",
    },
  });

  return await res.data;
};

const postData = async (obj) => {
  const data = {};
  for (key in obj) {
    if (key !== "refresh_token") {
      data[key] = obj[key];
    }
  }
  const res = await axios({
    url: "https://api.stage.targemy.com/v1/comment",
    method: "POST",
    headers: {
      Authorization: "Bearer  " + obj.refresh_token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  });
  return await res.data;
};

app.listen(5000, console.log("app start on port 5000"));
