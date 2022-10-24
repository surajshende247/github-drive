import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config()

const PORT = process.env.PORT || 5000;

const BASE_URL = "https://api.github.com/repos"

const app = express();
app.use(express.json({ limit: '50mb' }));

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Connected to MongoDB');
})

app.post('/upload', async (req, res) => {
  const { fileName, content } = req.body;
  const timestamp = Date.now();
  const githubAPIResponse = await axios.put(`${BASE_URL}/rtcmay4/s3/contents/${timestamp}${fileName}`, {
    "owner": "OWNER",
    "repo": "REPO",
    "path": "PATH",
    "message": "file created using API call",
    "committer": {
      "name": "Suraj Shende",
      "email": "surajshende247@gmail.com"
    },
    "content": content
  }, {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
    }
  })
  console.log(content);
  res.send(githubAPIResponse.data);
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
