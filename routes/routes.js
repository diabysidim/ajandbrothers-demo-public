

const express =  require('express'),
    Router = express.Router(),
    nodemailer      = require('nodemailer'),
    fs              = require('fs'),
    request         = require('request');



    const SECRET_KEY  = process.env.SECRET_KEY;


    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_EMAIL_PASSWORD,
                }
    });


const Email =  require('../models/email');

const Application =  require('../models/application');

const Handlebars = require('handlebars');

const applicationCategory = require('./application-catgory');

const countryOptions = require('./countryOptions');


//home route

Router.get('/', (req, res)=>{

                res.render('home');
        });


// contacct route

Router.post('/contact', (req, res)=>{

    if(!req.body.capcha){
        console.log("err");
        return res.json({"success":false, "msg":"Capctha is not checked"});
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body.capcha}`;

    // verify sender

    request(verifyUrl,(err,response,body)=>{

        if(err){console.log(err); }

        body = JSON.parse(body);

        if(!body.success && body.success === undefined){
            return res.json({"success":false, "msg":"captcha verification failed"});
        }
        else if(body.score < 0.5){
            return res.json({"success":false, "msg":" the operation failed you might be a bot, sorry!"});
        }


        try{

        // Open template file
        const emailSource = fs.readFileSync('email-templates/email-template.hbs', 'utf8');
        // Create email generator
        const emailTemplate = Handlebars.compile(emailSource);

        const createdEmail =  {

            SenderName: req.sanitize(req.body.name),
            SenderEmail : req.sanitize(req.body.email),
            Subject:  req.sanitize(req.body.subject),
            Content: req.sanitize(req.body.message)
        }


        Email.create(createdEmail, function(err){
                    if(err){
                        console.log("there is an error!!");
                        console.log(err);
                    }

                    else{
                        console.log("extrait added");
                        console.log()
                    }
                    })


            // sending the email

        const options = (email) => {
            return {
                from: process.env.SENDER_EMAIL,
                 to: process.env.RECEIVER_EMAIL,
                subject: "**** Un message tu as recu un message sur ajandbrothers.com****",
              html: emailTemplate({Email:email})
            };
          };

        transporter.sendMail(options(createdEmail), (err, info)=>{

           if (err){
            return res.json({"success":false, "msg":"Sorry, il y a eu un problem! vous pouvez reessayer ou envoyer votre email a ajandbrother.com"});
           }
           else{


            return res.json({"success":true, "msg":"Votre email a ete envoye"});

           }

        })

    }
    catch(e){

        console.log(e);
        return res.json({"success":false, "msg":"Sorry, il y a eu un problem! vous pouvez reessayer ou envoyer votre email a ajandbrother.com"});

    }


    })




});


// apply route

Router.get('/apply' ,(req, res)=>{

    res.render('application', {countryOptions:countryOptions})

})


Router.post('/apply', (req, res)=>{

    if(!req.body.capcha){
        console.log(req.body.name);
        return res.json({"success":false, "msg":"Capctha is not checked"});
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body.capcha}`;


    request(verifyUrl,(err,response,body)=>{

        if(err){console.log(err); }

        body = JSON.parse(body);

        if(!body.success && body.success === undefined){
            return res.json({"success":false, "msg":"captcha verification failed"});
        }
        else if(body.score < 0.5){
            return res.json({"success":false, "msg":"you might be a bot, sorry!"});
        }

        try{


        // Open template file
        const applicationSource = fs.readFileSync('email-templates/application-template.hbs', 'utf8');
        // Create email generator
        const applicationTemplate = Handlebars.compile(applicationSource);

        const application = {};
        const applicationInfo = [];
        const applicationEmail ={};

        for(let element in req.body){

            if(req.body[element]!==req.body.capcha) applicationInfo.push(req.body[element]);
         }

         let count = 0;

         for( let catgory in applicationCategory){

            application[catgory] = applicationInfo[count];
            applicationEmail[applicationCategory[catgory]]= applicationInfo[count];
            count++;
         }

         Application.create(application, function(err){
            if(err){
                console.log("there is an error!!");
                console.log(err);
            }

            else{
                console.log("extrait added");
                console.log()
            }
            })





        const options = (application) => {
            return {
                from: process.env.SENDER_EMAIL,
                to: process.env.RECEIVER_EMAIL,
                subject: "**** Une application recu sur ajandbrothers.com******",
              html: applicationTemplate({application:application})
            };
          };



        transporter.sendMail(options(applicationEmail), (err, info)=>{

           if (err){

            console.log(err)
           return res.json({"success":false, "msg":"sorry!! l'application n'a pas pu etre evoyer veuillez reessayer"});

           }
           else{

            return res.json({"success":true});

           }

        })
    }
    catch(e){

        console.log(e)
        return res.json({"success":false, "msg":"sorry!! l'application n'a pas pu etre evoyer veuillez reessayer"});


    }


    })



    })

Router.get('/success', (req, res)=>{

    res.render('success')
})



Router.get('*', (req, res)=>{


    res.redirect('/');
})












module.exports  = Router;