import Item from "../models/item.model.js";
import ItemOrder from '../models/itemOrder.model.js'

import fs from "fs";
import path from "path";

class Controller {
    // async createItem(req, res) {
    //     try {
    //         const item = await Item.create({
    //             title: req.body.title,
    //             description: req.body.description,
    //             price: req.body.price,
    //             size: req.body.size,
    //             stock: req.body.stock,
    //             category: req.body.category,
    //             image: req.file.path, // save the image path to your item model
    //         });

    //         // Retrieve the quantity of the item from ItemOrder
    //         const itemOrder = await ItemOrder.findOne({ ItemId: item._id });

    //         // Check if there is a quantity available
    //         let quantity = 0;
    //         if (itemOrder) {
    //             quantity = itemOrder.quantity;
    //         }

    //         // Retrieve the stock of the item
    //         const originalItem = await Item.findById(item._id);

    //         // Update the stock of the item
    //         if (originalItem) {
    //             originalItem.stock += quantity;
    //             await originalItem.save();
    //         }

    //         return res.status(200).json({ message: "Item created successfully.", originalItem });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Error creating item" });
    //     }
    // }

    async createItem(req, res) {
        try {
            const item = await Item.create({
                title: req.body.title,
                description: req.body.description,
                size: req.body.size,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
                image_url: req.file.path,

            })

            // Retrieve the quantity of the item from ItemOrder
            const itemOrder = await ItemOrder.findOne({ ItemId: item._id });

            // Check if there is a quantity available
            let quantity = 0;
            if (itemOrder) {
                quantity = itemOrder.quantity;
            }

            // Retrieve the stock of the item
            const originalItem = await Item.findById(item._id);

            // Update the stock of the item
            if (originalItem) {
                originalItem.stock += quantity;
                await originalItem.save();
            }

            return res.status(200).json({ message: "Item created successfully.", originalItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating item" });
        }
    }


    async getItemById(req, res) {
        const { id } = req.params
        try {
            const ItemById = await Item.findById(id);
            if (!ItemById) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: `Item with id=${id} doesn't exist`
                })
            }
            return res.status(200).json({
                status: 200,
                success: true,
                data: ItemById
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: error.message
            })
        }
    }

    async updateItem(req, res) {
        const { id } = req.params
        try {
            const updatedItem = await Item.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
            return res.status(200).json({ message: "successfully updated", updatedItem });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async deletedItem(req, res) {
        const { id } = req.params
        try {
            const deletedItem = await Item.findByIdAndDelete(id);

            if (!deletedItem) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: `Item with id=${id} doesn't exist`
                })
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Item deleted successfully"
            })
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getItems(req, res) {
        try {
            const allItems = await Item.find();
            return res.status(200).json({
                status: 200,
                success: true,
                data: allItems
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: error.message
            })
        }
    }

}
const controller = new Controller()
export default controller;