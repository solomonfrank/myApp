const express = require('express');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();
const { Client } = require('pg');

const path = require('path');



//connect to Db
const connection = 'postgresql://postgres:ifeyinwa5@localhost/recipeApp';

const client = new Client({connectionString: connection });

client.connect();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

 
// handlebars middleware

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//set public folder

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req, res) => {

 


client.query("SELECT * FROM recipe", ( err, result) => {

  if( err)  console.log('query failed');

  //console.log(result)
  res.render('home', { results: result.rows});
  //res.send(result);
 
  
});


});

// add route

app.post('/add',(req,res) =>{

const query = {
  text : "INSERT INTO recipe(name,direction,ingredient) VALUES ( $1, $2, $3)",
  values: [req.body.name, req.body.direction, req.body.ingredient ]
};

client.query(query, (err,result)=>{

  if(err) throw err;

  //res.status(201).send(`User added with ID: ${result.insertId}`);
  res.redirect('/');
});
  
});

//delete item

app.delete('/recipe/:id',(req, res) =>{


  let querys = {

    text : "DELETE  FROM recipe WHERE id = $id",
    values :[parseInt(req.params.id)]
  };
  console.log(req.params.id);
 
  client.query(querys, (err, result)=>{

    if(err) console.log(err)
   
    res.redirect('/;')

  });

});

//client.end();

 
// api
app.use('/api/members',require('./routes/api/member'))


//Set environment Port
 let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});