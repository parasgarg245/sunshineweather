const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const ejs=require("ejs"); 

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.static('public'))

var weatherdata=null;

app.get("/",function(req,res) {
    res.sendFile(__dirname+"/index.html");
   
});

app.post("/",function(req,res){
        var cityname=req.body.cityname;
        const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&APPID=ae4855f4718172592748594c8ebd215e&units=metric";
        
        https.get(url,function(response){

            console.log(response.statusCode);

            response.on("data",function(data){
                 weatherdata=JSON.parse(data);
                const temp =weatherdata.main.temp;
                const description=weatherdata.weather[0].description;
                const icon=weatherdata.weather[0].icon;
                
                const imageurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";



                res.write("<p>description of temperature is "+ description +"</p>\n");
                res.write(" <h1>the temp is " + temp + "</h1>");
                res.write("<img src="+ imageurl+">");

                res.send();
        })
    });

});













app.listen(3000,function(){
    console.log("server is runiing on port 3000");
});