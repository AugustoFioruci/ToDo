import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", (req, res) => authController.register(req, res));
authRouter.post("/login", (req, res) => authController.login(req, res));
