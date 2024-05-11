const User = require("../models/user");
const {
  getUserByEmailAddress,
  getUserById,
  updateUserProfile,
  getPublicProfiles,
} = require("../repositories/user.respository");

const getProfile = async (email) => {
  const userSchema = await getUserByEmailAddress(email);
  return userSchema;
};

const editProfile = (requestBody) => {};

const toggleProfileAccess = async (id) => {
  const userSchema = await getUserById(id);
  userSchema.profile.isPublic = !userSchema.profile.isPublic;
  await updateUserProfile(id, userSchema);
};

const getPublicProfilesService = async () => {
  const profiles = await getPublicProfiles();
  const data = profiles.map((profile) => {
    return {
      id: profile._id,
      email: profile.email,
      profile: profile.profile,
    }
  })
  return data;
};

module.exports = {
  getProfile,
  toggleProfileAccess,
  getPublicProfilesService
};
