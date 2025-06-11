import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

// Set up routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
const PORT = process.env.PORT;

if (!process.env.PORT) throw new Error("No PORT value in .env");

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`||| http://localhost:${PORT} |||`)
});
