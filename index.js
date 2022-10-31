const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;
const users = [
    { id: 1, name: 'Nafiz', email: "nafiz@gmail.com" },
    { id: 2, name: 'Tanvir', email: "tanvir@gmail.com" },
    { id: 3, name: 'Hossain', email: "hossain@gmail.com" },
    { id: 4, name: 'Saikat', email: "saikat@gmail.com" },
    { id: 5, name: 'Iqbal', email: "iqbal@gmail.com" },
    { id: 6, name: 'Nishad', email: "nishad@gmail.com" },
    { id: 7, name: 'Omor', email: "omor@gmail.com" },
    { id: 8, name: 'Abubakkar', email: "abubakkar@gmail.com" },
    { id: 9, name: 'Saaf', email: "saad@gmail.com" },
]
const uri = "mongodb+srv://dbuser1:JqnCiDz32aXNycT@cluster0.163tjbx.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("simple-node-project").collection("users");
    console.log('database connected');
    // perform actions on the collection object
});
async function run() {
    try {
        const userCollection = client.db("SimpleNode").collection('users');
        const user = { name: "Nafiz Iqbal", email: "nafiziqbal@gmail.com" }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user.id = result.insertedId
            // user.id = users.length + 1;
            res.send(user)
            console.log(result);

        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

//user : dbuser1
// password: JqnCiDz32aXNycT

app.get('/', (req, res) => {
    res.send('Simple node server ruinnung')
})
app.get("/users", (req, res) => {
    res.send(users)
})


// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     res.send(user)
//     console.log(user);

// })


app.listen(port, () => {
    console.log('Server Running');
})



// Replace the uri string with your MongoDB deployment's connection string.



module.exports = app;
