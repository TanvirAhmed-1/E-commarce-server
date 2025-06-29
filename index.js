require('dotenv').config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware

app.use(express.json());
app.use(cors());

//const uri = `mongodb+srv://e-commarce:${process.env.DB_PASS}@cluster0.0p516.mongodb.net/?appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0p516.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    //start

    const AllProducts = client.db("e_commarce").collection("products");
    const FavoriteCollection = client.db("e_commarce").collection("favorite");
    const AddOrderCard=client.db ("e_commarce").collection("AddToCard");
    const OrderCollection =client.db("e_commarce").collection("Order");
    const UserCollection =client.db("e_commarce").collection("Users");



    // users post

    app.post("/users",async(req,res)=>{
      const userData=req.body
      console.log(userData)
      const email=userData.Email
      const query={Email:email}
      const find=await UserCollection.findOne(query)
      if(find){
       return res.send({message:"user already Register"})
      }
      const result=await UserCollection.insertOne(userData)
      res.send(result)
    })

    app.get("/users",async(req,res)=>{
      const result=await UserCollection.find().toArray()
      res.send(result)
    })

    app.patch("/users/:id",async(req,res)=>{
      const id=req.params.id
      const data=req.body
      const filter={_id: new ObjectId(id)}
      const updateDoc={
        $set:data
      }
      const result=await UserCollection.updateOne(filter,updateDoc)
      res.send(result)
    })

    app.delete("/users/:id",async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)}
      const result=await UserCollection.deleteOne(query)
    res.send(result)
    })

    
 

  //products get 
 app.get("/products", async (req, res) => {
  const sort = req.query?.sort;
  const search = req.query?.search;
  const ass = req.query?.ass;
  const min = parseInt(req.query?.min) || 0;
  const max = parseInt(req.query?.max) || 5000;

  let sortQuery = {};
  let searchQuery = {};

  // If price range is provided
  if (req.query.min || req.query.max) {
    searchQuery.price = { $gte: min, $lte: max };
  }

  // If search is provided
  if (search) {
    searchQuery.title = { $regex: search, $options: "i" };
  }

  // Sort by price descending or ascending
  if (sort === "true") {
    sortQuery = { price: -1 };
  } else if (ass === "true") {
    sortQuery = { price: 1 };
  }

  try {
    const result = await AllProducts.find(searchQuery).sort(sortQuery).toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

  


    

    app.post("/products",async(req,res)=>{
      const data=req.body
      const result=await AllProducts.insertOne(data)

      res.send(result)
    })

    app.patch("/update/product/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: data,
      };
      const result = await AllProducts.updateOne(filter, updateDoc);
      res.send(result)
      
    })

    app.get("/products/:id",async(req,res)=>{
      const id=req.params.id
      console.log(id)
      const query={_id: new ObjectId(id)}
      const result=await AllProducts.findOne(query)
      res.send(result)
    })

app.delete("/products/delete/:id",async(req,res)=>{
  const id=req.params.id
  const query={_id: new ObjectId(id)}
  const result=await AllProducts.deleteOne(query)
  res.send(result)
})

// get admin all order 

app.get("/user/admin/order",async(req,res)=>{
  const result=await OrderCollection.find().toArray()
  res.send(result)
})

app.delete("/user/admin/order/:id",async(req,res)=>{
const id=req.params.id
const query={_id: new ObjectId(id)}
const result=await OrderCollection.deleteOne(query)
res.send(result)
})

app.patch("/user/admin/order/:id",async(req,res)=>{
const id=req.params.id
const data=req.body
const filter={_id: new ObjectId(id)}
const updateDoc={
  $set:data
}
const result=await OrderCollection.updateOne(filter,updateDoc)
res.send(result)
})

// product add to favorite list

app.post("/favorite",async(req,res)=>{
  const data=req.body
  const result=await FavoriteCollection.insertOne(data)
  res.send(result)
})

app.get("/favorite/:email",async(req,res)=>{
  const email=req.params.email
  const UserFind={email:email}
  const result=await FavoriteCollection.find(UserFind).toArray()
  res.send(result)
})

app.delete("/favorite/delete/:id",async(req,res)=>{
  const id=req.params.id
  console.log("tanvir",id)
  const query={_id:id}
  const result=await FavoriteCollection.deleteOne(query)
  res.send(result)
})


//user add to card section
app.post("/addToCard",async(req,res)=>{
  const data=req.body
  const result=await AddOrderCard.insertOne(data)
  res.send(result)
})

app.get("/addToCard/:email",async(req,res)=>{
  const email = req.params.email;
  const FindUser={email:email}
  const result=await AddOrderCard.find(FindUser).toArray()
  res.send(result)
})

app.delete("/addToCard/delete/:id",async(req,res)=>{
  const id=req.params.id
  console.log(id)
  const query={_id:new ObjectId(id)}
  const result=await AddOrderCard.deleteOne(query)
  res.send(result)
})

app.post("/order",async(req ,res)=>{
  const data=req.body
  const productId=data.items.map(v=> new ObjectId (v.productId))
  const DeleteProductId=await AddOrderCard.deleteMany({
    _id:{$in:productId}
  });
  const result=await OrderCollection.insertOne(data)
  res.send({
    success: true,
    result,
    DeleteProductId
  });
})


// admin home state

app.get("/admin/home",async(req,res)=>{
  const totalProducts=await AllProducts.countDocuments(); 
  const totalUsers=await UserCollection.countDocuments();
  res.send({
    allProducts:totalProducts,
    allUsers:totalUsers
  }) 
})

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`the CRUD Operation is running port ${port} `);
});


