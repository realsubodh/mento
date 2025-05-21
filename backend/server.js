const express = require("express");
const cors = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// morgan logs requests everytime frontend hits backend

app.use("/api/v1/", rootRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
