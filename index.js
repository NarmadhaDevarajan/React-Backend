//simple web server

const http=require('http');
 
let notes=[
    {
        id:1,
        content:'backend server using nodejs',
        important:true
    },
    {
        id:2,
        content:'backend server using nodejs',
        important:false
    },
    {
        id:3,
        content:'backend server using nodejs',
        important:true
    }
];
// const { type } = require('os');
const app=http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'Application/json'});
    response.end(json.stringify(notes));
});
const PORT=3001;
app.listen(PORT);
console.log(`Server running on the port number ${PORT}`);