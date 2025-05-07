const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    itemName:   {type: String, require: true},
    description:    {type: String},
    locationFound:  {type: String},
    dateFound:  {type: Date, default: Date.now},
    claimed:   {type: Boolean, default: false}
   },
{timestamps: true}
)

const Item = new mongoose.model("Item", itemSchema)

module.exports = Item



