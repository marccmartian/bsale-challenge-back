const { request, response } = require("express");
const path = require("path");

/**
 * It takes a request and a response object as parameters, and then it sends the image file to the
 * client.
 * @param [req] - request
 * @param [res] - The response object.
 */
const displayImage = (req = request, res = response) => {
  const { img } = req.params;
  const pathImage = path.join(__dirname, `../assets/${img}`);

  res.sendFile(pathImage);
};

module.exports = {
  displayImage,
};
