import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        size: {
            type: String,
        },
        price: {
            type: Number,
        },
        stock: {
            type: Number,
        },
        // image: {
        //     type: String,
        // },
    },

    {
        timestamps: true,
    }

);

const Item = model('Item', itemSchema);
export default Item;