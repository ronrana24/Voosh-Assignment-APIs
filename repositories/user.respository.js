const userModel = require("../models/user");

const getUserByEmailAddress = async (emailAddress) => {
  const userSchema = await userModel
    .findOne({
      email: emailAddress,
    })
    .exec();

  return userSchema;
};

const getUserById = async (id) => {
  const userSchema = await userModel.findById(id).exec();
  return userSchema;
};

const addNewUser = async (userModelSchema) => {
  await userModelSchema.save();
};

const getPublicProfiles = async () => {
  const profiles = await userModel
    .find({
      "profile.isPublic": true,
    })
    .exec();
  return profiles;
};

const updateUserProfile = async (id, userSchema) => {
  await userModel.findByIdAndUpdate(id, userSchema);
};

const getAllProfiles = async () => {
  const profiles = await userModel.find();
  return profiles;
};

module.exports = {
  addNewUser,
  getUserByEmailAddress,
  getUserById,
  updateUserProfile,
  getPublicProfiles,
  getAllProfiles,
};
