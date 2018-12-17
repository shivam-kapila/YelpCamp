var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill", 
//     image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg"
    
//   },function (err, campground) {
//     if(err){
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   }
//     )  

app.get("/", function (req, res) {
  res.render("landing"); 
});

app.get("/campgrounds", function (req, res) {
 // Get all campgrounds from DB
 Campground.find({}, function(err, allCampgrounds){
   if(err){
     console.log(err);
   } else {
  res.render("campgrounds", {campgrounds:allCampgrounds});    
   }
 });
  
});


app.post("/campgrounds", function (req, res) {
// get data from form and add to campgrounds page
var name = req.body.name;
var image = req.body.image;
var newCampground = {name: name, image: image};
// Create a ew campground and save to DB
Campground.create(newCampground, function (err, newlyCreated) {
if(err){
  console.log(err);
} else {
//redirect back to campgrounds page
res.redirect("/campgrounds");
}
});
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});
    
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The YelpCamp Server Has Started!");
});