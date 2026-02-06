import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import { inngest, functions } from "./inngest/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

/* 🔥 INNGEST ENDPOINT */
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

/* 🔥 TEST ROUTE (FOR RUNS TAB) */
app.get("/test-inngest", async (req, res) => {
  await inngest.send({
    name: "clerk/user.created",
    data: {
      id: "test_user_123",
      email_addresses: [{ email_address: "test@example.com" }],
      first_name: "Test",
      last_name: "User",
      image_url: "",
    },
  });

  res.send("✅ Inngest test event sent");
});

/* 🔥 CLERK WEBHOOK (REAL USE) */
app.post("/api/clerk/webhook", async (req, res) => {
  const event = req.body;

  await inngest.send({
    name: `clerk/${event.type}`,
    data: event.data,
  });

  res.status(200).json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
