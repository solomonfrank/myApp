
const http = require('http');
const server = http.createServer((req,res) => {
  let name = req.query.name;
  console.log(name);
  res.status(200).type('html');

   
   if(name) {
     res.write('welcome'+ name)
   } else {
     res.write('welcome guest');
   }
   res.end();
});



server.listen(3000);


console.log('listening on port 3000')