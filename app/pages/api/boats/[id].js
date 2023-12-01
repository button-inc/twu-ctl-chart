import db from '../../../utils/db';

export default async function handler(req, res) {
    const { id } = req.query; // Extract the boat ID from the URL

    if (req.method === 'PUT') {
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
    } else {
        // Handle other methods or return an error
        res.status(405).json({ message: 'Method not allowed' });
    }
}
