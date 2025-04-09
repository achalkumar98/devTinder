const express = require("express");

const app = express();

const port = 7777;

//Routing parameters

// This will work for "/abc" and "/ac" also
// app.get(/ab?c/, (req, res) => {
//   res.send({firstName: "Achal", lastName: "Kumar"}  );
// });


// "/abc", "/abbc", "/abbbc", "/abbbbbbbbbbbbbc" will work
// "/ac", "/ab" will not work

// app.get(/ab+c/, (req, res) => {
//   res.send({firstName: "Achal", lastName: "Kumar"}  );
// });

// it will support - "abcbcbcbcd"
// app.get(/ab*cd/, (req, res) => {
//   res.send({firstName: "Achal", lastName: "Kumar"}  );
// });

app.listen(port, () => {
  console.log("Server is running on port 7777");
});
