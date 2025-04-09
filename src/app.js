const express = require("express");

const app = express();

const port = 7777;


// get method to get data from the server
// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send({firstName: "Achal", lastName: "Kumar"}  );
// }); 



// app.get("/user/:userId", (req, res) => {
//   console.log(req.params);
//   res.send({firstName: "Achal", lastName: "Kumar"}  );
// }); 

app.listen(port, () => {
  console.log("Server is running on port 7777");
});
