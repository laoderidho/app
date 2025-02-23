import { Elysia } from "elysia";
import { authController } from "../Controller/Auth/auth.controller";

export const router = new Elysia()

router.use(authController)