const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rootRouter = require("./routes/index");


dotenv.config();

require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// morgan logs requests everytime frontend hits backend

app.use("/api/v1/", rootRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
