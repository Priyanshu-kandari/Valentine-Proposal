import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow larger payloads for images

// Database Setup
let db;
(async () => {
    try {
        db = await open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });
        await db.exec(`
    CREATE TABLE IF NOT EXISTS proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      yourName TEXT,
      partnerName TEXT,
      image TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
        console.log('Connected to SQLite database');
    } catch (e) {
        console.error('Failed to connect to database:', e);
    }
})();

// API Routes
app.post('/api/proposals', async (req, res) => {
    const { yourName, partnerName, image } = req.body;

    if (!yourName || !partnerName) {
        return res.status(400).json({ error: 'Names are required' });
    }

    try {
        const result = await db.run(
            'INSERT INTO proposals (yourName, partnerName, image) VALUES (?, ?, ?)',
            [yourName, partnerName, image]
        );
        res.json({ id: result.lastID });
    } catch (error) {
        console.error('Error saving proposal:', error);
        res.status(500).json({ error: 'Failed to save proposal' });
    }
});

app.get('/api/proposals/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const proposal = await db.get('SELECT * FROM proposals WHERE id = ?', id);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        console.error('Error fetching proposal:', error);
        res.status(500).json({ error: 'Failed to fetch proposal' });
    }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all non-API requests to React app
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
