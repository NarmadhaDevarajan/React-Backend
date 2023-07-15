var http=require("http");
// simple web server
const express=require('express') ;
const app=express();
const cors = require('cors');
const { error } = require("console");
const { ifError } = require("assert");
//middleware
app.use(cors());
app.use(express.json());

app.get('/create-files',(request,response)=>{
    const fs=require("fs");
    const path=require("path");
   const dir="./logs";
   let date=new Date();
    const filename=`${date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"  "+" "+date.getHours()+":"+date.getMinutes()+"-"+date.getSeconds()}`;
    console.log(filename);
    const filepath=path.join(dir,filename);
    console.log(filepath);
    if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    }
    fs.writeFile(filepath,date.toString(),(error)=>{
    if(error){
        throw error;
    }
    else{
        console.log("file created");
    }});
    response.send(filename);
 })
app.get('/get-file',(request,response)=>{
    const fs=require('fs');
    const path=require('path');
    const dir='./logs';
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.readdir(dir,(error,files)=>{
        if(error) throw error;
        response.send(files);
    })
})

const PORT=3001;
app.listen(PORT,()=>console.log(`Server running on the port number ${PORT}`));
