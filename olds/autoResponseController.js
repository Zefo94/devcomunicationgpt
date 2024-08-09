// controllers/autoResponseController.js
const { AutoResponse } = require('../models');

const setAutoResponse = async (req, res) => {
  const { message } = req.body;
  let autoResponse = await AutoResponse.findOne();
  if (autoResponse) {
    autoResponse.message = message;
    await autoResponse.save();
  } else {
    autoResponse = await AutoResponse.create({ message });
  }
  res.send({ message: 'Auto response message set successfully' });
};

const getAutoResponse = async (req, res) => {
  const autoResponse = await AutoResponse.findOne();
  res.send({ message: autoResponse ? autoResponse.message : '' });
};

module.exports = { setAutoResponse, getAutoResponse };
