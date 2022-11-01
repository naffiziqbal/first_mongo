const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;

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


        //GET Data From Database
        app.get("/users", async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray()
            res.send(users)
        })

        //POST Data InTo Database
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user.id = result.insertedId
            // user.id = users.length + 1;
            res.send(user)
            console.log(result);

        });

        //  Delete User 
        app.delete('/users/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result);
                console.log(id);

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
// app.get("/users", (req, res) => {
//     res.send(users)
// })


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
