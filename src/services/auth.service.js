const User = require("../models/User");

const findOrCreateUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      googleId: profile.id,
      profileImage: profile.photos?.[0]?.value,
    });
  }

  return user;
};

module.exports = {
  findOrCreateUser,
};