const axios = require('axios');
const moment = require('moment');
const { render } = require('ejs');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const app = express();
const PORT = process.env.PORT || 8000;

const cloudStorage = require('./cloudStorage');

cloudinary.config({
    cloud_name: 'dwqgcc3se',
    api_key: '957962481464987',
    api_secret: 'loUEwgrDzaC3wZbJd1L050gHmig',
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// dashboard view
app.get('/', (req, res) => {
    axios
        .get('http://localhost:5000/api/v1/cars')
        .then((response) => {
            res.render('index', { cars: response.data, moment: moment });
        })
        .catch((error) => {
            console.log(error);
        });
});

// create Car view
app.get('/create-car', (req, res) => {
    res.render('create_car');
});

// create car action
app.post('/create-car', cloudStorage.single('car_image'), (req, res) => {
    const fileBase64 = req.file.buffer.toString('base64');
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, { folder: 'challenge_05' }, async function (err, result) {
        if (!!err) {
            console.log(err);
            return res.status(400).json({
                message: 'Gagal upload file!',
            });
        }

        const body = req.body;
        body.car_image = result.secure_url;
        try {
            const users = await axios.post('http://localhost:5000/api/v1/cars', body);
            return res.redirect('/');
        } catch (err) {
            return res.status(500).json(err);
        }
    });
});

// updateCar view
app.get('/update-car/:id', async (req, res) => {
    const id = req.params.id;
    axios
        .get(`http://localhost:5000/api/v1/cars/${id}`)
        .then((response) => {
            console.log(response.data);
            res.render('update_car', { cars: response.data });
        })
        .catch((error) => {
            console.log(error);
        });
});

// update car request
app.post('/update-car/:id', cloudStorage.single('car_image'), (req, res) => {
    const fileBase64 = req.file.buffer.toString('base64');
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, { folder: 'challenge_05' }, async function (err, result) {
        if (!!err) {
            console.log(err);
            return res.status(400).json({
                message: 'Gagal upload file!',
            });
        }

        const id = req.params.id;
        const body = req.body;
        body.car_image = result.secure_url;

        try {
            const users = await axios.put(`http://localhost:5000/api/v1/cars/${id}`, body);
            return res.redirect('/');
        } catch (err) {
            return res.status(500).json(err);
        }
    });
});

// filter car by type
app.get('/:id', (req, res) => {
    const type_id = req.params.id;
    axios
        .get(`http://localhost:5000/api/v1/cars/type/${type_id}`)
        .then((response) => {
            res.render('index', { cars: response.data, moment: moment });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// filter car by type
app.post('/search', (req, res) => {
    if (req.body.search === '' || req.body.search === null) {
        return res.redirect('/');
    } else {
        axios
            .get('http://localhost:5000/api/v1/search-cars/' + req.body.search)
            .then((response) => {
                res.render('index', { cars: response.data, moment: moment });
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

app.get('/delete-car/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await axios.delete(`http://localhost:5000/cars/${id}`);
        res.redirect('/');
    } catch {
        res.status(500).json(err);
    }
});

app.listen(PORT, () => {
    console.log(`Client running on http://localhost:${PORT}`);
});
