//simple web server
const express=require('express') ;
const app=express();
let notes=[
    {
        id:1,
        content:'backend server using nodejs',
        important:true
    },
    {
        id:2,
        content:'backend restful using nodejs will grow complex',
        important:false
    },
    {
        id:3,
        content:'express makes backend restful painless',
        important:true
    }
];
//set end points
app.get('/',(request,response)=>{
    // response.send('hello world');
    response.send('<h1>Notes Application!</h1>');

})
//get all notes

app.get('/api/notes',(request,response)=>
{
    response.json(notes);
})


const PORT=3001;
app.listen(PORT,()=>console.log(`Server running on the port number ${PORT}`));
