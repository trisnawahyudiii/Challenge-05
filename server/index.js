const express = require('express');
const PORT = process.env || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
