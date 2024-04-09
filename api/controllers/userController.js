const UserModel = require("../models/userModel");

const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const {
    regno,
    mobile,
    emailpersonal,
    domain,
    volunteered,
    volunteeredEvent,
    participated,
    participatedEvent,
  } = req.body;
  try {
    if (
      !regno ||
      !mobile ||
      !emailpersonal ||
      !domain ||
      !volunteered ||
      !participated
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required booboo" });
    }
    const updateObj = {};
    if (volunteeredEvent !== undefined)
      updateObj.volunteeredEvent = volunteeredEvent;
    if (participatedEvent !== undefined)
      updateObj.participated = participatedEvent;

    const postinfo = await UserModel.findOne({
      _id: id,
      regno: regno,
    });
    if (!postinfo) {
      return res.status(200).json({
        message:
          "some error in your email id,regno or you hav changed it for the orginal email and id",
      });
    }
    if (postinfo.isProfileDone) {
      return res.status(200).json({
        message:
          "you basic profile update is done. go to update profile for changing details",
      });
    } else {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id, regno: regno },

        {
          mobile: mobile,
          emailpersonal: emailpersonal,
          domain: domain,
          volunteered: volunteered,
          // volunteeredEvent: volunteeredEvent,
          participated: participated,
          // participatedEvent: participatedEvent,
          isProfileDone: true,
          $set: updateObj,
        }
      );
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateUserDomain = async (req, res) => {
  const { id } = req.params;
  const { email, regno, domain } = req.body;
  try {
    if (!email || !regno || !domain) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const postinfo = await UserModel.findOne({
      user_id: id,
      email: email,
      regno: regno,
    });
    if (!postinfo) {
      return res.status(200).json({
        message:
          "some error in your email id,regno or you hav changed it for the orginal email and id",
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { user_id: id, email: email, regno: regno },
      { domain: domain }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { UpdateUserDomain, UpdateUser };
