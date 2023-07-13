//simple web server
const express=require('express') ;
// const ATLAS_URL=require('ATLAS_URL');
const app=express();
const cors = require('cors');
//middleware
app.use(cors());

app.use(express.json());
const url=process.env.ATLAS_URL;
const mongoose=require("mongoose");
// console.log(process.argv);
// const url=`mongodb+srv://narmijan4:narmathajan4@cluster0.yq6ncdj.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
                .then(()=>{
                    console.log("connected to mongodb");
                    // mongoose.connection.close();
                })
                .catch((error)=>{
                    console.log(error);
                });
//save a note in db
//define a schema
const noteSchema=new mongoose.Schema({
    content:String,
    important:Boolean
});
//create a model
const Note=mongoose.model('Note',noteSchema);//collection name:notes
//actual data to store in the db
const note=new Note({
    Content:'javascript is awesome',
    important:true
});
//set end points
// app.get('/',(request,response)=>{
//     // response.send('hello world');
//     response.send('<h1>Notes Application!</h1>');

// })
//get all notes

app.get('/api/notes',(request,response)=>
{
    Note.find({}, {})
    .then(notes=>{response.status(200).json(notes)});
})
// to create new resource based on request data
app.post('/api/notes',(request,response)=>{
    // console.log(request.body);
    notes=notes.concat(request.body);
    // response.status(201).json({message:'post request made succesful'})
    note.save()
    .then(()=>{
        response.status(201).json({message:'note created successfully'});
    })
    
});
// //fetches a single resource based on id
    app.get('/api/notes/:id',(request,response)=>{
    const id=request.params.id;
    Note.findById(id)
    .then(note=>{
        if(note){
            response.status(200).json(note);
        }
        else{
            response.status(404).json({message:"id does not exist "});}
        })}
    );
    

// //delete a single resource based on ID
app.delete('/api/notes/:id',(request,response)=>{
    //get th id
    const id=request.params.id;
    // notes.filter(note=>note.id!=id);
    Note.findByIdAndDelete(id)
    .then((deletedNote)=>{
        if(deletedNote){
            response.status(204).json(note);
        }
        else{
            response.status(404).json({message:"id does not exist "});
        }
    });
    });
    
// //replace the entire note object identified by an id
// app.put('api/notes/:id',(request,response)=>
// {
//     const id=request.params.id;
//     const noteToReplace=request.body;
//     const note=notes.find(note=>note.id==id);
//     notes =notes.map(note=>note.id==id? noteToReplace:note);
//     if(note){
//         response.status(200).json({message:"note replaced"});
//     }
//     else{
//     response.status(404).json({message:"id does not exist "});}
// });
// app.patch('api/notes/:id',(request,response)=>
// {
//     const id=request.params.id;
//     const noteToReplace=request.body;
//     const note=notes.find(note=>note.id==id);
//     notes =notes.map(note=>note.id==id? {...note,...noteToReplace}:note);
//     if(note){
//         response.status(200).json({message:"note patched"});
//     }
//     else{
//     response.status(404).json({message:"id does not exist "});}
// });

const PORT=3001;
app.listen(PORT,()=>{
        console.log(`Server running on the port number ${PORT}`)});
