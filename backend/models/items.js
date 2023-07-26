import mongoose from "mongoose";
import UserDb from "./user.js";
const Schema = mongoose.Schema;

// Define the Sales sub-schema
const salesSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    sold_to: {
        type: String,
        default: null
    },
    sold_at: {
        type: Date,
        required: true
    }
});

// Define the main schema
const itemSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true,
      default: 'items/default.jpg'
    },
    price: {
        type: String,
        required: true
    },
    sales: {
        type: [salesSchema],
        required: true,
        default: []
    },
});

const addItem = async (user, item) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newItem = new Item({id: item.id, name: item.name, owner: user.public.username, price: item.price});
            await newItem.save();
            resolve();
        }catch (e){
            console.log(e);
            reject(e);
        }
    })
}

const getItemById = async (user, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = Item.findOne({id:id});
            if (items.owner === 'user') resolve(items);
            else resolve(await items.select('-sales').select('-_id').select('-__v').exec());
        }catch (e){
            console.log(e);
            reject(e);
        }
    })
}

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

export { addItem, getItemById };
