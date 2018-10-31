let express = require("express");

const app = express();

app.use(express.static('public'))

let users = require("./state").users;


//Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js

app.get("/users",function(req,res,next)
{
 return res.json(users);
});
//Give your server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js

app.get("/users/1",function(req,res,next){
    return res.json(users[0])
   
});
//Give your server the ability to respond to a POST request with a path "/users" and just add a hard coded user object to the users array from state.js. .json() the last user in the array to send it back to the client. 
app.post("/users",function(req,res,next){
    users.push({
    _id: 6,
    name: "Stefan Jakimovski",
    occupation: "Developer",
    avatar: "https://nerdist.com/wp-content/uploads/2018/02/Injustice-2-TMNT-Leonardo.jpg"
    });
 return res.json(users[users.length-1]);
 //return res.send(users[users.length-1])
});
//Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value on the first user object in the users array in state.js. .json() this user to send it back to the client.
app.put("/users/1",function(req,res,next){
    users[0]={
    "_id": 1,
    "name": "Dale Cooper",
    "occupation": "FBI Agent, Bounty Hunter",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
    }
    return res.json(users[0])
});

//Give your server the ability to respond to a DELETE request with a path "/users/1" and remove one item from the users array. send() back a messsage "deleted"
app.delete("/users/1", (req, res, next) => {
    users.splice(0, 1);
    return res.json("deleted");
});

//homework
//get all users
app.get('users', (req,res,next) =>{
    let allusers = users.filter((u)=> u.isActive);
    return res.json(allusers);
})

// get specific id of users array in state.js
app.get('/users/:id', (req,res,next) =>{
    let user = users.find((u)=> u._id == req.params.id);
    return res.json(user);
})

//Post

app.post('/users1', (req,res,next) =>{
    const newUser = { 
        '_id': users[users.length-1]._id + 1,
        'name': req.body.name
    };
    users.push(newUser);
    return res.json(users[users.length-1]);
})


//Put

app.put('/users/:id', (req,res,next)=>{
    users[res.params.id].name='Stefan'
    return res.json(users[users.length-1]);
})
//delete
app.delete('/users/:id', (req,res,next)=>{
    let user = users.find((u)=> u._id == req.params.id);

    user.isActive= false;

    return res.json('Deleted!');
})

//default
app.use(function(req,res){
    return res.json("Not found! 404")
});



app.listen(3002, (err) => {
if (err) {
  return console.log("Error", err);
}
console.log("Web server is now living in apartment 3002");
})