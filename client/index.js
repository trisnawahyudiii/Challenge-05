const express = require('express');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const app = express();
const PORT = process.env.PORT || 8000;

const cloudStorage = require('./cloudStorage');
const { render } = require('ejs');

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
            res.render('index', { cars: response.data });
        })
        .catch((error) => {
            console.log(error);
        });
});

// create Car view
app.get('/create-car', (req, res) => {
    res.render('create_car');
});

// create Car view
app.get('/update-car', (req, res) => {
    res.render('update_car');
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

app.listen(PORT, () => {
    console.log(`Client running on http://localhost:${PORT}`);
});
