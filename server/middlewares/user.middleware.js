import { readAccessToken, readAdminAccessToken } from "../utils/user.utils.js";

export function authenticateUser(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Access token not found in the request header",
    });
  }

  try {
    const decoded = readAccessToken(accessToken);

    req.user = decoded;

    next()
    
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expire access token",
    });
  }
}


export function authenticateAdmin(req, res, next) {
   const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Access token not found in the request header",
    });
  }

  try {
    const decoded = readAdminAccessToken(accessToken);

    if(decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        message: "Not authorized login again",
      });
    }

    next()
    
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expire access token",
    });
  }
}