const {createTask} = require('../controllers/taskController')

const router = require('express').Router();

router.get('/',(req, res)=>{
    res.send("Alls tasks");
})

router.post('/', createTask);

module.exports = router;