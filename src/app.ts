import express from "express";
import "express-async-errors";

import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";
import { setupSwagger } from "./configs/swagger";

export const app = express();

app.use(express.json());

setupSwagger(app);

app.use(routes);

app.use(errorHandling);
