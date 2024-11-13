import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { NextFunction } from "express";

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-jwt'];
    console.log(token);
    next();
}
