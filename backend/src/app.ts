import express from "express";
import cors from "cors";
import routes from "./routes";
import { apiKeyMiddleware } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiKeyMiddleware, routes);

export default app;