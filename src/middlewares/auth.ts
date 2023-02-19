import { Application, Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import User from "../models/user";
const secret: string = process.env.JWT_SECRET as string;



declare module "express-serve-static-core" {
  interface Request {
    userId: string,
    user: string
  }
}




export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("auth fired")
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authorization.split(' ')[1];

  try {
    const { user_name } = jwt.verify(token, secret) as { user_name: string, _id: string };
    const user = await User.findOne({ user_name }).select("user_name");

    if (!user) {
      return res.status(400).json({ message: 'Invalid Token' });
    }

    req.user = user.user_name;
    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }

}


//   const bearerHeader = req.headers['authorization']

//   if (bearerHeader !== undefined) {
//   const bearerToken = bearerHeader.split(' ')[1]

//     interface Dec {
//       _id: string,
//       user_name: string,
//       iat: number,
//       exp: number
//     }

//     const decoded: Dec = jwt.verify(bearerToken, secret) as Dec

//     if (!decoded) {
//       res.sendStatus(403)
//     }

//     req._id = decoded._id
//     req.user_name = decoded.user_name
//     next()
//   } else {
//     res.sendStatus(403)
//   }

// }