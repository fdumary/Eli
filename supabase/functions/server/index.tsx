import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-92855c06/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/make-server-92855c06/config/feedback-email", async (c) => {
  try {
    const feedbackEmail = await kv.get("app_config:feedback_email");

    if (typeof feedbackEmail !== "string" || !feedbackEmail.includes("@")) {
      return c.json({ error: "Feedback email is not configured" }, 404);
    }

    return c.json({ feedbackEmail });
  } catch (error) {
    console.error("Failed to load feedback email:", error);
    return c.json({ error: "Failed to load feedback email" }, 500);
  }
});

Deno.serve(app.fetch);
