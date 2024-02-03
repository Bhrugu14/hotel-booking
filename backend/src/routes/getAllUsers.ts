import express, { Request, Response } from "express";
import User from "../models/users";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    let user = await User.find();
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }
    return res.status(200).json({ users: user });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
