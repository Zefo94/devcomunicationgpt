const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.send({ user, token });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.send({ user, token });
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    user.status = status;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateAutoResponseMessage = async (req, res) => {
  const { autoResponseMessage } = req.body;
  const userId = req.user.id; // Asegúrate de que req.user contenga el ID del usuario autenticado
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    user.autoResponseMessage = autoResponseMessage;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


module.exports = { register, login, updateStatus, getUserProfile, updateAutoResponseMessage };
