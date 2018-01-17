const nodemailer = require('nodemailer');
const express=require('express');

const app=express();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var jsonParser = bodyParser.json()
app.get('/',function(req,res){
    //console.log(req);
    res.send(req.params);
})

app.get('/mail/:name/:phone/:email/:location/:message/:img/',jsonParser,function(req,res){
    //console.log(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('content-type', 'text/html');
  console.log(req.body);
    var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'jobayer@webpers.com',
            pass: 'Webpers123'
          }
        });

        var mailOptions = {
          from: 'jobayer@webpers.com',
          to: 'jobayer@webpers.com',
          subject: "Complain mail",
          html: '<h1>Name: '+req.params.name+'</h1><h2>Phone Number :'+req.params.phone+'<h2>E-mail :'+req.params.email+'<h2>Location :'+req.params.location+'</h2><p>Message :'+req.params.message+'</p>',
          attachments:[
                  {
                  filename: 'Attachment.png',
                    //path:"https://cdn.pixabay.com/photo/2014/09/28/10/36/road-sign-464647_960_720.png"
                    content:req.params.img,
                    //path:req.params.img
                    encoding: 'base64'
                  }
            ]
          
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.send(error);
          } else {
            res.send('Email sent');
          }
        });
    
    //res.send(send);
})

app.post('/',jsonParser,function(req,res){
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.contentType('application/json');
    console.log(req.body);
    var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'cid.hotline@gmail.com',
            pass: 'Webpers123'
          }
        });

        var mailOptions = {
          from: 'cid.hotline@gmail.com',
          to: 'cid.hotline@gmail.com',
          
          subject:"complain mail",
          html:'<h1>Name: '+req.body.name+'</h1><h2>Phone Number :'+req.body.phone+'<h2>E-mail :'+req.body.email+'<h2>Location :'+req.body.location+'</h2><p>Message :'+req.body.text+'</p>',
          //text:"Hellow",
          attachments:[
                  {
                    filename:'Attachment.png',
                    content:req.body.path,
                    encoding:'base64'
                    //path:req.body.path
                  }
            ]
          
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.send(error);
          } else {
            res.send('Email sent');
          }
        });
    
})



app.listen(process.env.PORT,function(){
    console.log("Server started at port:8080");
})