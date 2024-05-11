const User = require("../models/user");
const { getProfile, toggleProfileAccess, getPublicProfilesService } = require("../services/user.service");

exports.getProfile = async (req, res) => {
  try {
    console.log(req.user);
    const email = req.user.email;
    const userSchema = await getProfile(email);
    return res.json({
      profile: userSchema.profile,
      id: userSchema._id,
      email: userSchema.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Validate request body
    // Update user profile
    // Return updated profile
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleProfileAccess = async (req, res) => {
  await toggleProfileAccess(req.user.id);
  return res.status(204).json();
};

exports.getProfiles = async (req, res) => {
  const profiles = await getPublicProfilesService();
  return res.json(profiles);
};
