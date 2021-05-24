const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

var apiKey = "4f4d6cc8d42e26ed0a62c89db87dacd3-us1"; //Here your API key from Mailchimp
var listID = "68d3dd926c"; //Here your list id

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var brand = req.body.IAM;

    var data = {
        members: [
            {
            iam:brand,
            optionvalue: 1,
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                PHONE: phone
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us1.api.mailchimp.com/3.0/lists/" + "68d3dd926c",
        method: "POST",
        headers: {
            "Authorization": "anagutjor " + "4f4d6cc8d42e26ed0a62c89db87dacd3-us1"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log(response.statusCode);
                if(response.statusCode === 200){
                    res.sendFile(__dirname + "/success.html");
                } else {
                    res.sendFile(__dirname + "/failure.html");
                }
        }
    })
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000");
})
