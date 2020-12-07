const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile('index.html') 
    res.sendFile('index.js')
    res.sendFile('./src/Product.js')
});


app.listen(3000, function(){
    console.log("Server on port 3000");
});