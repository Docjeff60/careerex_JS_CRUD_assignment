const express = require("express");
const mongoose = require("mongoose");
const Item = require("./itemModel");

const app = express();

app.use(express.json());  //enables the backend to see whatever is passed 

const PORT = process.env.PORT || 5000;


const MONGODB_URL = "mongodb+srv://docjef60:Moses1122@clusterschooldb.ctfb5zp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSchoolDB"
//connect mongoose to your mongoDB_URL
mongoose.connect(MONGODB_URL).then(() => {
  console.log("mongoDB connected...");
  app.listen(PORT, () => {
    console.log(`server started running... ${PORT}`); 
  });
});




//APIs

//Add a found item
app.post("/add-item", async (req, res) => {

  const { itemName, description, locationFound, dateFound, claimed } = req.body

  if (!itemName) {
    return res.status(400).json({message: "Please enter item name"})
  }

  const newItem = new Item({itemName, description, locationFound, dateFound, claimed})

  await newItem.save()

  res.status(201).json({
    message: "Success",
    newItem
  })


});



//View all unclaimed items
app.get("/unclaimed-items", async (req, res) => {
    const unclaimedItems = await Item.find() 

    res.status(200).json({
        message: "Success",
        unclaimedItems
    })
})




//View one item by ID
app.post("/one-item/:id", async (req, res) => {

    const {id} = req.params

    const item = await Item.findById(id)

    if(!item){
        return res.status(404).json({message: "Item not found."})
    }

    res.status(200).json({
        message: "Success",
        item
    })

})






//Update an item’s details or mark as claimed
app.patch("/update-item/:id", async (req, res) => {

    const {id} = req.params

    const {itemName, description, locationFound, dateFound, claimed} = req.body

    const updatedItem = await Item.findByIdAndUpdate(
        id,
        {itemName, description, locationFound, dateFound, claimed},
        {new: true}
    )


    res.status(201).json({
        message: "Success",
        updatedItem
    })
   

});






//Delete old/irrelevant entries
app.delete("/delete-item", async (req, res) => {
    
    const {id} = req.body

    const deletedItem = await Item.findByIdAndDelete(id)

    if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
    }
    
    
    res.status(200).json({
        message: "Item deleted successfully"
    })
})




