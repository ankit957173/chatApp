//protech route
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// import asyncHandler from "express-async-handler";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, token not found"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized, invalid token"
            });
        }
        //check if user exists and not sending password back to client
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized, user not found"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};