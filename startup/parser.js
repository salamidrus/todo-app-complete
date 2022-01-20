const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('uploads'));
};
