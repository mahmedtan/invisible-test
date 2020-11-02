const weather = require("./weather");

/* //Trying out with two locations
weather("New York", 11001); */
/* 
//With 4 locations

weather("Paris", "United Kingdom", "Pennsylvania", 95010); */

//The API only respondes to one api request per sec so multiple locations may not work sometimes
weather("Prague");
