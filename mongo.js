const mongoose=require("mongoose");
// console.log(process.argv);
const url=`mongodb+srv://narmijan4:narmathajan4@cluster0.yq6ncdj.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
                .then(()=>{
                    console.log("connected to mongodb");
                    // mongoose.connection.close();
                })
                .catch((err)=>{
                    console.error(err);
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

//save a note in db
note.save()
.then((result)=>{
    console.log('note saved');
    mongoose.connection.close();
});
Note.find({},{})
    .then(notes=>{
        notes.forEach((note)=>{
        console.log(notes)});
        mongoose.connection.close();
    })