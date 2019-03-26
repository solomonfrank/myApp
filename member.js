 
 const express = require('express');
 const router = express.Router();

const members = require('./Members');
const app = express();
app.use(express.json());

// fetching single member

 
// fetching all the members
router.get('/',(req,res) => res.json(members));


router.get('/:id', (req,res)=>{

    let found = members.some( member => member.id === parseInt(req.params.id));

    if (found){
    
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{

     res.status(400).json({msg: "id not found"});
    }
});

module.exports = router;