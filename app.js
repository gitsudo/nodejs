const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3400;

var conn = mysql.createConnection({
    host: process.env.hostname,
    user: "sammy",
    password: process.env.pwd,
    database: "testDB"
});

app.get('/',(req,res)=>{
    res.send('Hi to Kish');
});

app.get('/createtable',(req,res)=>{
    conn.connect((err)=> {
        if(err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE student (name VARCHAR(255), address VARCHAR(255), marks INT)";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send("Table Created!");
            res.end;
        });
    })
});

app.post('/addStudent',(req,res)=>{
    conn.connect((err)=>{
        if(err) throw err;
        var sql = "INSERT INTO student (name,address,marks) VALUES('Rock','Abcd, Delhi, India',78)";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send("Student Data Added!");
            res.end;
        })
    });
});

app.put('/updateStudent',(req,res)=>{
    conn.connect((err)=>{
        if(err) throw err;
        var sql = "UPDATE student SET address = 'Abcd, Chennai, India' WHERE name = 'Rock'";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send("Record Updated!");
            res.end;
        })
    });
});

app.delete('/deleteStudent',(req,res)=>{
    conn.connect((err)=>{
        if(err) throw err;
        var sql = "DELETE FROM student WHERE name = 'Rock'";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send("Record Deleted!");
            res.end;
        })
    });
});

app.get('/getstudents',(req,res)=>{
    conn.connect((err)=> {
        if(err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM student";
        conn.query(sql,(err,result,fields)=>{
            if(err) throw err;
            res.send(result);
            res.end;
        });
    })
});

app.listen(port,()=>{
    console.log('Server is running on port '+port);
});
