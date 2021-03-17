const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/index.html'))
});

router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/exercise.html'))
});

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/stats.html'))
});

module.exports = router;