const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

// models
const { Cars, Car_Types } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Crete Car
app.post('/api/v1/cars', (req, res) => {
    const body = req.body;

    Cars.create(body)
        .then((cars) => {
            res.status(200).json({ data: cars });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Read Car
app.get('/api/v1/cars', async (req, res) => {
    try {
        const cars = await Cars.findAll({
            include: [{ model: Car_Types, as: 'type' }],
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Car

// Delete Car

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
