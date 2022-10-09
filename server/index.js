const express = require('express');
const sequelize = require('sequelize');
const PORT = process.env.PORT || 5000;
const app = express();

// models
const { Cars, Car_Types } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create Car
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

// Read all Car
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

// Get Car by Id
app.get('/api/v1/cars/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await Cars.findByPk(id);
        console.log(cars);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get car by type
app.get('/api/v1/cars/type/:id', async (req, res) => {
    try {
        const type_id = req.params.id;
        const cars = await Cars.findAll({
            where: { car_type: type_id },
            include: [{ model: Car_Types, as: 'type' }],
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// search API
app.get('/api/v1/search-cars/:search', async (req, res) => {
    try {
        const lookFor = req.params.search.toLowerCase();
        const cars = await Cars.findAll({
            where: {
                car_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('car_name')), 'LIKE', '%' + lookFor + '%'),
            },
            include: [{ model: Car_Types, as: 'type' }],
        });
        console.log(cars);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Car
app.put('/api/v1/cars/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Cars.update(body, { where: { id: id } })
        .then((cars) => {
            res.status(200).json(cars);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

// Delete Car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;

    Cars.destroy({ where: { id: id } })
        .then((cars) => {
            res.status(200).json({ data: cars });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
