const { request, response } = require("express");
const path = require("path");

const displayImage = (req = request, res = response) => {
  const { img } = req.params;
  const pathImage = path.join(__dirname, `../assets/${img}`);

  res.sendFile(pathImage);
};

module.exports = {
  displayImage,
};
