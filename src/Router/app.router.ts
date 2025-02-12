import { Elysia } from "elysia";
import { AppController } from "../Controller/app.controller";
import { authRouter } from "./auth.router";

const appController = new AppController()

export const router = new Elysia()

router.get("/", () => appController.getHello())

router.use(authRouter)