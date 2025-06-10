const AuthService = require("./service");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await AuthService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await AuthService.register(username, email, password, role);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.user.userId; // Assuming user ID is stored in req.user by auth middleware
  try {
    const user = await AuthService.getUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
