const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});
app.post("/",function(req,res){
    console.log(req.body);
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const data={
        members: [
            {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
            }
        }


        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/c5bfdff8e1";
    const options={
        method:"POST",
        auth:"saiphanindra11:59a053eeca845a5418ecee9decd68019-us11"
    }
    const request1=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname +"/success.html")
        }
        else{
            res.send(__dirname+"/failure.html");

        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request1.write(jsonData);
    request1.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server is working on port 3000");
})



// mailchimo-pi=59a053eeca845a5418ecee9decd68019-us11;
//listid=c5bfdff8e1