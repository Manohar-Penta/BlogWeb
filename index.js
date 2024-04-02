import express from 'express';
import bodyParser from 'body-parser';
import {v4 as uuid} from 'uuid';
import {dirname} from 'path';

const app = express();
const port = 3000;
const pwd = dirname(process.argv[1]);

app.use(express.static(pwd+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

let blogs = [
    {
        id : uuid(),
        title : "Fish In the water",
        desp : "Water drying Fish crying then eagle coming and eating the fish."
    },
    {
        id: uuid(),
        title: 'Todd',
        desp: 'lol that is so funny!'
    },
    {
        id: uuid(),
        title: 'Skyler',
        desp: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        title: 'Sk8erBoi',
        desp: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        title: 'onlysayswoof',
        desp: 'woof woof woof'
    }
];

app.get("/",(req,res)=>{
    res.render("home.ejs",{blogs});
});

app.get("/view/:id",(req,res)=>{
    let {id} = req.params;
    let data = blogs.find( c => c.id===id);
    if(data){
        res.render("view.ejs",{data});
    }
    else {
        res.render("error.ejs");
    }
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

app.get("/update/:id",(req,res)=>{
    let {id} = req.params;
    let data = blogs.find(c => c.id===id);
    res.render("update.ejs",{data});
});

app.post("/delete/:id",(req,res)=>{
    let {id} = req.params;
    blogs = blogs.filter(c => c.id!=id);
    res.redirect("/");
});

app.post("/new/create",(req,res)=>{
    let {title,desp} = req.body;
    blogs.push({id:uuid(),title,desp});
    res.redirect("/");
});

app.post("/update/:iden",(req,res)=>{
    let {iden} = req.params;
    let {title,desp} = req.body;
    for(let c of blogs){
        if(c.id === iden){
            c.title = title;
            c.desp = desp;
        }
    }
    res.redirect("/");
});

app.listen(port,()=>{
    console.log("Server UP and Running : ");
});

