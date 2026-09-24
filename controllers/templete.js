const express = require('express');
const path = require('path');

exports.getEjs = (req, res) => {
  res.render('index');
};

