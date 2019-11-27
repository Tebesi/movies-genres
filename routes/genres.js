const express = require('express')
const router = express.Router();

const genres = [{ id: 1, "name": "Thriller" },
    { id: 2, "name": "War" },
    { id: 3, "name": "Comedy" },
    { id: 4, "name": "Animation" }]


router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with that ID cannot be found!!');
    res.send(genre);
})

router.post('/', (req, res) => {
   
    const {error} =validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length + 1,
        name : req.body.name
    }
    genres.push(genre);
    res.send(genre);
})

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with that ID cannot be found!!');

    const {error} =validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with that ID cannot be found!!');

    const {error} =validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
        return Joi.validate(course,schema)
}
module.exports = router;