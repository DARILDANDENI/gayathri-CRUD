const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

app.use(cors());
app.use(express.json());
//database connection
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'itachi123',
    database: 'gayathri'
})
//creating api
app.get('/',(req,res)=>{
const sql="SELECT * from student1";
db.query(sql,(err,data)=>{
    if(err) return res.json("Error");
    return res.json(data);
});
});

app.post('/create',(req,res)=>{
    const sql="INSERT INTO student1(`Name`,`email`,`Lastname`,`Education`,`About`,`DOB`)VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.lastname,
        req.body.education,
        req.body.about,
        req.body.date

    ]
    db.query(sql,[values],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.put('/update/:id',(req,res)=>{
    const sql="update student1 set `Name`=?, `email`=?, `Lastname`=?, `Education`=?, `About`=?, `DOB`=? where ID=?";
    const values=[
        req.body.name,
        req.body.email,
        req.body.lastname,
        req.body.education,
        req.body.about,
        req.body.date
    ]
    const id=req.params.id;
    db.query(sql,[...values,id],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete('/student/:id',(req,res)=>{
    const sql="DELETE from student1 where ID=?";
    const id=req.params.id;
    db.query(sql,[id],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8085,() =>{
    console.log("listening");
})