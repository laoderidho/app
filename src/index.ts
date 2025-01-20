import { Elysia } from "elysia";
import { router } from "./Router/app.router";

const app = new Elysia()

app.use(router);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
