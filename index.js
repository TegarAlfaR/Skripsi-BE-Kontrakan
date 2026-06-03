const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

const router = require("./routers");
const notFound = require("./middlewares/notFound");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "welcome to kontrakan API",
    data: null,
  });
});

app.use("/api/v1", router);

app.use(notFound);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
