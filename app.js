const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
        }
    }
]
};
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/055777ea6c";
    const options = {
        method: "POST",
        auth: "ankur02:513fdbcec34cd64b2f469f24ebef6a84-us21"
    };

    const request = https.request(url,options,function(response){

        if(response.statusCode=== 200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/faliure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/faliure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
    console.log("server running on port 3000")
});



// API key: 513fdbcec34cd64b2f469f24ebef6a84-us21
// list key: 055777ea6c
