import cors from 'cors';
import express from 'express';
import db from './config/database';
import router from './routes';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', error);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
  console.log(`API base URL: ${baseUrl}`);
  console.log(`MongoDB connection state: ${db.readyState}`);
});
