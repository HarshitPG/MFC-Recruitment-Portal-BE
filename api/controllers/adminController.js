const UserModel = require("../models/userModel");
const TechTaskModel = require("../models/techTaskModel");
const DesignTaskModel = require("../models/designTaskModel");

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10000000;
    const skip = page * limit;

    const { domain, subdomain } = req.query;
    const { regno } = req.body;

    let filter = {};

    if (domain) {
      filter.domain = { $in: domain.split(",") };
    }

    if (regno) {
      filter.regno = { $regex: new RegExp(regno, "i") };
    }

    // if (name) {
    //   filter.username = { $regex: new RegExp(name, "i") };
    // }
    console.log("filter", filter);

    const users = await UserModel.aggregate([
      {
        $match: filter,
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
          techTasks: {
            $filter: {
              input: "$techTasks",
              as: "task",
              cond: {
                $in: [subdomain, "$$task.subdomain"],
              },
            },
          },
          designTasks: {
            $filter: {
              input: "$designTasks",
              as: "task",
              cond: {
                $in: [subdomain, "$$task.subdomain"],
              },
            },
          },
          designTasks: {
            $filter: {
              input: "$managementTasks",
              as: "task",
              cond: {
                $in: [subdomain, "$$task.subdomain"],
              },
            },
          },
          isDoneTech: "$techTasks.isDone",
          isDoneDesign: "$designTasks.isDone",
          isDoneManagement: "$managementTasks.isDone",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserStatus = async (req, res) => {
  const { regno, roundOne, roundTwo, roundThree } = req.body;
  const successMessages = [];
  const errorMessages = [];

  try {
    if (!regno) {
      return res.status(400).json({ message: "Regno is required" });
    }

    for (const reg of regno) {
      const user = await UserModel.findOne({ regno: reg });
      if (!user) {
        errorMessages.push(`User with regno ${reg} not found`);
        continue;
      }

      if (roundOne !== undefined) {
        user.roundOne = roundOne;
      }
      if (roundTwo !== undefined) {
        user.roundTwo = roundTwo;
      }
      if (roundThree !== undefined) {
        user.roundThree = roundThree;
      }

      await user.save();
      successMessages.push(`User with regno ${reg} updated successfully`);
    }

    const response = {
      successMessages: successMessages,
      errorMessages: errorMessages,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllUser, updateUserStatus };
