import dbConnect from "../../utils/dbConnect";
import User from "../../models/users"
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { username, password } = req.body;

        if (!(username && password)) {
          return res.status(400).json({
            success: false,
            message: "username and password are required",
          });
        }
        if (username.length < 3) {
          return res.status(400).json({
            success: false,
            message: "Username must be atleast 3 characters",
          });
        }

        if (password.length < 3) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Password must be atleast 3 characters",
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res
            .status(400)
            .json({ success: false, message: "username must be unique" });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
          username,
          password: passwordHash,
        });

        const savedUser = await user.save();

        res.status(201).json({ success: true, data: savedUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
