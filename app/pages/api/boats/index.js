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

    if (req.method === 'DELETE') {
        const { id } = req.body;
        try {
            const result = await db.query(
                'DELETE FROM boats WHERE id = $1 RETURNING *',
                [id]
            );
            if (result.rows.length > 0) {
                res.status(200).json({ message: 'Boat deleted successfully' });
            } else {
                res.status(404).json({ message: 'Boat not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    else {
        // Handle other methods or return an error
    }
}
