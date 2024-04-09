const applicationStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({
      user_id: id,
    });
    if (user.roundOne === false) {
      res.status(200).json({
        message:
          "Your application is under evaluation. Stay tunned for results.",
      });
    } else if (user.roundOne === true && user.roundTwo === true) {
      res.status(200).json({
        message:
          "congratulations! You have been selected for second round. All the best.",
      });
    } else if (
      user.roundOne === true &&
      user.roundTwo === true &&
      user.roundThree === true
    ) {
      res.status(200).json({
        message:
          "congratulations! You have been selected for third round. All the best.",
      });
    } else if (
      user.roundOne === true &&
      user.roundTwo === true &&
      user.roundThree === true &&
      user.isCore === true
    ) {
      res.status(200).json({
        message: "congratulations! You have been selected.",
      });
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports = {
  applicationStatus,
};
