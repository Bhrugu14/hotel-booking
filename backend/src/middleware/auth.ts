import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  console.log("PATH", process.env.FRONTEND_URL);
  if (!token) {
    return res
      .status(401)
      .json({ message: "unauthorized", addedPath: process.env.FRONTEND_URL });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "unauthorized", addedPath: process.env.FRONTEND_URL });
  }
};

export default verifyToken;
