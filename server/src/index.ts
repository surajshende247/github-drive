import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Octokit } from "@octokit/core";
import axios from "axios";
dotenv.config();
const octokit = new Octokit({ auth: `${process.env.GITHUB_TOKEN}` });

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: "50mb" }));

mongoose.connect(process.env.MONGODB_URI || "", () => {
  console.log("Connected to MongoDB");
});

app.post("/upload", async (req: Request, res: Response) => {
  const { fileName, content } = req.body;
  const timestamp = Date.now();
  const githubAPIResponse = await octokit.request(
    `PUT /repos/rtcmay4/s3/contents/${timestamp}${fileName}`,
    {
      owner: "OWNER",
      repo: "REPO",
      path: "PATH",
      message: "my commit message",
      committer: {
        name: "Monalisa Octocat",
        email: "octocat@github.com",
      },
      content,
    }
  );
  res.send(githubAPIResponse.data);
});

app.post("/delete", async (req: Request, res: Response) => {
  const { fileName, sha } = req.body;
  const githubAPIResponse = await octokit.request(
    `DELETE /repos/rtcmay4/s3/contents/${fileName}`,
    {
      owner: "OWNER",
      repo: "REPO",
      path: "PATH",
      message: "my commit message",
      committer: {
        name: "Monalisa Octocat",
        email: "octocat@github.com",
      },
      sha,
    }
  );
  res.send(githubAPIResponse.data);
});

app.post("/contents", async (req: Request, res: Response) => {
  const githubAPIResponse = await octokit.request(
    `GET /repos/rtcmay4/s3/contents/`
  );
  res.send(githubAPIResponse.data);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
