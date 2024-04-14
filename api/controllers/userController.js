const UserModel = require("../models/userModel");
const mongoose = require("mongoose");

const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const {
    // regno,
    mobile,
    emailpersonal,
    domain,
    // volunteered,
    volunteeredEvent,
    // participated,
    participatedEvent,
  } = req.body;
  try {
    if (
      // !regno ||
      !mobile ||
      !emailpersonal ||
      !domain
      // !volunteered ||
      // !participated
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required booboo" });
    }
    // const updateObj = {};
    // if (volunteeredEvent !== undefined)
    //   updateObj.volunteeredEvent = volunteeredEvent;
    // if (participatedEvent !== undefined)
    //   updateObj.participated = participatedEvent;

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
          // volunteered: volunteered,
          volunteeredEvent: volunteeredEvent,
          // participated: participated,
          participatedEvent: participatedEvent,
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

const getuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "techtasks",
          localField: "_id",
          foreignField: "user_id",
          as: "techTasks",
        },
      },
      {
        $lookup: {
          from: "designtasks",
          localField: "_id",
          foreignField: "user_id",
          as: "designTasks",
        },
      },
      {
        $lookup: {
          from: "managementtasks",
          localField: "_id",
          foreignField: "user_id",
          as: "managementTasks",
        },
      },
      {
        $project: {
          username: 1,
          email: 1,
          regno: 1,
          verified: 1,
          mobile: 1,
          emailpersonal: 1,
          domain: 1,
          volunteered: 1,
          volunteeredEvent: 1,
          participated: 1,
          participatedEvent: 1,
          roundOne: 1,
          roundTwo: 1,
          roundThree: 1,
          isProfileDone: 1,
          techSubdomains: "$techTasks.subdomain",
          techIsDone: "$techTasks.isDone",
          designSubdomains: "$designTasks.subdomain",
          designIsDone: "$designTasks.isDone",
          managementSubdomains: "$managementTasks.subdomain",
          managementIsDone: "$managementTasks.isDone",
        },
      },
    ]);

    if (userData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { UpdateUserDomain, UpdateUser, getuser };
