import jwt from "jsonwebtoken";
import { HttpError } from "../lib/httpError.js";
import { User } from "../models/user.model.js";


export const authenticate = async (req, res, next) => {
  const {authorization = ""} = req.headers;
  const [bearer, token ] = authorization.split(" ");
  if(bearer !== "Bearer" || !token) {
    next(HttpError(401))
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const { id } = decoded

    const user = await User.findById(id);
    if(!user )  {
        next(HttpError(401, "Unauthorized - user not found"));
    }

    
  } catch (error) {
    
  }
}