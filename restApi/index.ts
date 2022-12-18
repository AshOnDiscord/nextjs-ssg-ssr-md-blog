import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "./firebaseToken.json";

const server: Express = express();
const port = 5000;

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();

server.use(bodyParser.text());

server.post("/", async (req: Request, res: Response) => {
  // console.log(req.body.trim());

  const md: string | null = req.body?.trim();

  if (!md) return res.send("No markdown provided");

  const title = md
    .split("\n")[0] // Get first line
    .slice(2) // Remove # from start
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim() // Remove extra whitespace
    .replaceAll(" ", "-") // Remove special characters
    .replace(/-{2,}/g, "-") // Remove extra dashes
    .toLowerCase();

  // console.log(title);

  await db.collection("posts").doc(title).set({ md });
  res.send("Success");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
