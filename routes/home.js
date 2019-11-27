const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index',{title: "Hello", message:"Hello guys"})
})
module.exports = router;