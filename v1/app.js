var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

  var campgrounds= [
      {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f4c87aa0ecb4b0_340.jpg"},
      {name: "Granite Hill", image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg"},
      {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144591f9c27ea6ecbd_340.jpg"}
      ];

app.get("/", function (req, res) {
  res.render("landing"); 
});

app.get("/campgrounds", function (req, res) {
  res.render("campgrounds", {campgrounds:campgrounds}); 
});


app.post("/campgrounds", function (req, res) {
// get data from form and add to campgrounds page
var name = req.body.name;
var image = req.body.image;
var newCampground = {name: name, image: image};
campgrounds.push(newCampground);
//redirect back to campgrounds page
res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});
    
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The YelpCamp Server Has Started!");
});