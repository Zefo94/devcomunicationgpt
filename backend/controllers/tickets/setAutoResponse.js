const { AutoResponse } = require('../../models');

const setAutoResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const autoResponse = await AutoResponse.create({ message });
    res.send(autoResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = setAutoResponse;
