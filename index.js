const express = require("express");
const { MongoClient } = require('mongodb');
const  ObjectId = require('mongodb').ObjectId;
const app = express();
const formidableMiddleware = require('express-formidable');
const url = 'mongodb://localhost:27017';
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(formidableMiddleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>
{
    res.send("Hello World!");
})
app.get("/api/v3/app/events",(req,res)=>
{
    let {id,page,limit} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const o_id = new ObjectId(id);
    if(id!=undefined)
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("DTProject");
            dbo.collection("documents").findOne({_id:o_id}, function(err, result) {
                if (err) throw err;
                console.log("Data is: ------");
                res.send(result);
                console.log(result);
                db.close();
            });
        });
    }
    else
    {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("DTProject");
            dbo.collection("documents").find().sort({name:1}).limit(limit).skip((page-1)*limit).toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
                console.log(result);
                db.close();
            });
        });
    }
});
app.post("/api/v3/app/events",(req,res)=>
{
    const reqData = req.fields;
    const img = req.files;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DTProject");
        let data = {name:reqData.name,files:img,tagline:reqData.tagline, 
            schedule:reqData.schedule,description:reqData.description,
            moderator:reqData.moderator,category:reqData.category,sub_category:reqData.sub_category
        };
        dbo.collection("documents").insertOne(data, function(err, result)
        {
            if (err) throw err;
            res.send(result);
            console.log("Inserted");
            db.close();
        });
    });
});

app.put("/api/v3/app/events/:id",(req,res)=>
{
    const id = req.params.id;
    const o_id = ObjectId(id);
    console.log(o_id);
    const reqData = req.fields;
    const img = req.files;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DTProject");
        let data = {name:reqData.name,files:img,tagline:reqData.tagline, 
            schedule:reqData.schedule,description:reqData.description,
            moderator:reqData.moderator,category:reqData.category,sub_category:reqData.sub_category
        };
        dbo.collection("documents").updateOne({_id:o_id}, {$set:data}, function(err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.send(result);
            db.close();
        });
    });

});
app.delete("/api/v3/app/events/:id", (req,res)=>
{
    const id = req.params.id;
    const o_id = ObjectId(id);
    console.log(o_id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DTProject");
        dbo.collection("documents").deleteOne({_id:o_id}, function(err, obj) {
            if (err) throw err;
            res.send(obj);
            console.log("Deleted");
            db.close();
        });
        
    });
});
app.listen(PORT, (err)=>
{
    if(!err)
    {
        console.log(`Server is listening on PORT ${PORT}`);
    }
    else
    {
        console.log(err);
    }
})