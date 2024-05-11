const { getAllProfilesService } = require("../services/admin.service");

exports.getAllProfiles = async (req, res) => {
  const profiles = await getAllProfilesService();
  return res.json({ data: profiles });
};
