const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../authMiddleware");


// signup || zod validation
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input data",
    });
  }

  try {
    // checkn existing user
    const existingUser = await User.findOne({
      username: body.username,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    // hashing password
    const { username, password, firstName, lastName } = body;

    const hashedPassword = await bcrypt.hash(password, 5);

    // creating user
    await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return res.status(200).json({
      message: "User created successfully!!",
    });
  } catch (error) {
    res.status(411).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

  // signin with zod validation
  const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });

  router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if (!success) {
      return res.status(411).json({
        message: "Wrong username or password.",
      });
    }
    const { username, password } = body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      // password comparing
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Incorrect Password!",
        });
      }

      // generating jwt token
      const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET
    )
    return res.status(200).json({
        message:"Signin successfull!!",
        token
    })

    } catch (error) {
        return res.status(500).json({
            message:"something went wrong while signing.",
            error: error.message
        })
    }
  });


  router.get("/me", authMiddleware, async (req, res) => {
    res.json({ message: "Protected route access granted!", userId: req.userId });
  });

module.exports = router;
