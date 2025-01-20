import { Elysia } from "elysia";
import { AppController } from "../Controller/app.controller";


const appController = new AppController()

export const router = new Elysia()

router.get("/", () => appController.getHello())