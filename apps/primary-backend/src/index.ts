
import { Elysia } from "elysia";
import { app as authApp } from "./modules/auth";
import { app as apiKeysApp } from "./modules/apiKeys";

import { app as paymentsApp } from "./modules/payments";

const app = new Elysia()
  .use(authApp)
  .use(apiKeysApp)

  .use(paymentsApp)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
