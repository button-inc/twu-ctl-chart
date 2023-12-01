// pages/api/boats/index.js
import db from '../../../utils/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, status } = req.body;
        
        try {
            const result = await db.query(
                'INSERT INTO boats(name, status) VALUES ($1, $2) RETURNING *',
                [name, status]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } 
    if (req.method === 'GET') {
        try {
            const result = await db.query('SELECT * FROM boats');
            res.status(200).json(result.rows);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    if (req.method === 'PUT') {
        const { id } = req.query; // Extract the boat ID from the URL
        const { status } = req.body;

        try {
            // Check if the boat exists
            const boatExists = await db.query('SELECT * FROM boats WHERE id = $1', [id]);
            if (boatExists.rows.length === 0) {
                return res.status(404).json({ message: 'Boat not found' });
            }

            // Update the boat status
            const result = await db.query(
                'UPDATE boats SET status = $1 WHERE id = $2 RETURNING *',
                [status, id]
            );
            res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else {
        // Handle other methods or return an error
    }
}
