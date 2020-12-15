const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose").set('debug', true);
const prompt = require("prompt");

prompt.start();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//------------------------------------
mongoose.connect("mongodb://localhost:27017/pilares")
    .then(db => console.log("Db connected"))
    .catch(err => console.log(err));

let prodSchemaJSON = {
    id: Number,
    nombre: String,
    precio: Number
}

let prod_schema = new mongoose.Schema(prodSchemaJSON);
let Prod = mongoose.model("Prod",prod_schema, "pilares");
//------------------------------------

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//C
app.get("/new", function(req,res){
    res.render("new.ejs");
});

app.post("/", function(req,res){

    //obtener nombre, precio y id
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let id = prod.length + 1;
    
    let product = new Prod({nombre: nombre, precio: precio, id: id});
    
    //crear en db
    product.save(function(){
        console.log("done");
    });


    draw();
    res.render("index.ejs", {products: prod, count: qty, success: "Nuevo producto agregado."});
});

//Agregar al carrito
app.post("/add", function(req, res){
    qty[req.body.add - 1] += 1;
    console.log(qty);
    res.render("index.ejs", {products: prod, count: qty, success: "Agregado al carrito"});
});

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//R
app.get("/", function(req,res){
    draw();
    res.render("index.ejs", {products: prod, count: qty, success: ""});
});

app.get("/main", function(req,res){
    res.render("index.ejs", {products: prod, count: qty, success: ""});
});

app.get("/carrito", function(req, res){
    getTotal();
    res.render("carrito.ejs", {products: prod, count: qty, total: total, success: ""} );
});

app.post("/pagar", function(req,res){
    qty.forEach(function(q){
        qty.shift();
        qty.push(0);
    });
    
    getTotal();
    res.render("index.ejs", {products: prod, count: qty, total: total, success: "Pagado. Gracias por su compra."} );
});

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//U
app.get("/update", function(req,res){
    res.render("update.ejs");
});

app.post("/update", function(req,res){

    //Nombre viejo
    let old = req.body.old;

    //obtener nombre, precio
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    
    //Actualizar db
    let product = Prod.findOne({nombre: old}, function(err,docs){
        docs.set({
            nombre: nombre,
            precio: precio
        });
        docs.save();

        draw();
        res.render("index.ejs", {products: prod, count: qty, total: total, success: "Producto actualizado."} );
    });
});

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//D
app.get("/delete", function(req,res){
    res.render("delete.ejs");
});

app.post("/delete", function(req,res){

    //Nombre
    let nombre = req.body.nombre;

    //Eliminar
    Prod.findOne({nombre: nombre}, function(err,docs){
        docs.remove();
        
        draw();
        res.render("index.ejs", {products: prod, count: qty, total: total, success: "Producto eliminado"} );
    });
});
//----------------------------------------------------------------------
//----------------------------------------------------------------------

function getTotal(){
    total = 0;
    prod.forEach(function(p){
        total += p.precio * qty[p.id - 1];
    });
}

function draw(){
    Prod.find(function(err,docs){
        prod = [];
        qty = [];
        docs.forEach(function(doc){
            prod.push(doc)
            qty.push(0);
        });
    });
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------

app.listen(3000, function(){
    console.log("Server on port 3000");
});

let prod = []
let qty = []
let total = 0;

draw();