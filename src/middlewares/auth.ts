import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { models } from '../models';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { username, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "Access token has expired"
        });
      }
      res.locals.loggedInUser = await models.User.findOne({where: {username: username}});
      next();
    } catch (error) {
      return res.status(401).json({
        error: "Access token not valid"
      });
    }
  } else {
    res.status(401).send('Access token missing');
  }
}