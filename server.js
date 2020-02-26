// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Initiate database connection

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data
// API Routes


client.connect();
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;

app.get('/api/todos', async(req, res) => {
    try {
        const results = await client.query(`
        SELECT * FROM todos;
        `);
        res.json(results.rows);
    }
    catch (err){
        console.log(err);
    }
});
app.post('/api/todos', async (req, res) => {
    const todo = req.body;

    try {
        const result = await client.query(`
            INSERT into todos (task, complete)
            VALUES ($1, $2)
            RETURNING *;
        `,
            [req.body.todo, req.body.complete]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    try {
        const result = await client.query(`
            UPDATE todos
            SET complete = $1
            WHERE id = $2
            RETURNING *;
        `, [req.body.complete, req.params.id]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    // get the id that was passed in the route:

    try {
        const result = await client.query(`
            DELETE FROM todos
            WHERE id = $1
            RETURNING *;
        `, [req.params.id]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});