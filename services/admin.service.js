const { getAllProfiles } = require("../repositories/user.respository");

const getAllProfilesService = async () => {
  const profiles = await getAllProfiles();
  const data = profiles.map((profile) => {
    return {
      id: profile._id,
      email: profile.email,
      profile: profile.profile,
    };
  });

  return data;
};

module.exports = {
  getAllProfilesService,
};
