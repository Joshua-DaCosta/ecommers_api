const router = require('express').Router();

router.get('/get', (req, res) => {
    res.send('user/get route');
});

router.post('/post', (req, res) => {
    res.send("user/post route");
})
module.exports = router;