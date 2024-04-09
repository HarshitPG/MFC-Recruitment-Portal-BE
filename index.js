const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoute = require("./api/routes/authRoute");
const userRoute = require("./api/routes/userRoute");
const taskRoute = require("./api/routes/taskRoute");
const adminRoute = require("./api/routes/adminRoute");
const statusRoute = require("./api/routes/statusRoute");
const connectDb = require("./api/db/dbConnection");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/upload", taskRoute);
app.use("/admin", adminRoute);
app.use("/applicatiostatus", statusRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
