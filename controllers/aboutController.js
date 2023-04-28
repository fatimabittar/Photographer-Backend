import Model from "../models/aboutModel.js";
import fs from 'fs';

class Controller {

  //get All
  async getAll(req, res, next) {
    try {
      const respon = await Model.find({});
      return res.status(200).json(respon)

    } catch (err) {
      return res.status(500).json({
        data: err
      })
    }
  }

  //get story by id
  async get(req, res, next) {
    let { id } = req.params;

    try {
      const getAbout = await Model.findById(id);

      if (!getAbout)
        return res.status(404).json({
          data: `Info with this ${id} does not exist`
        })
      return res.status(200).json({
        data: getAbout
      })

    }
    catch (err) {
      return res.status(500).json({
        data: getAbout
      })
    }
  }

  // creating new story
  async post(req, res) {

    const body = req.body;
    try {

      const doc = new Model(body);
      if(req.file){
        doc.image_url = req.file.path;
      }
      const new_date = await doc.save()

      return res.status(200).json({ new_date });
    }

    catch (err) {
      return res.status(500).json({
        data: err.message
      })
    }
  }
  //update an author by _id
  async put(req, res, next) {
    let { id } = req.params; 
    let body = req.body;
    try {
      const existingDoc = await Model.findById(id);
      if (!existingDoc){
        return res.status(404).json({ message: `Info with id ${id} does not exist` });
      }
      if(req.file){
        fs.unlinkSync(existingDoc.image_url); // remove old image file
        body.image_url = req.file.path; // set new image path
      }
      const updatedDoc = await Model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).json({ data: updatedDoc, message: `Updated successfuly` });
    }
    catch (err) {
      return res.status(500).json({
        data: err.message
      })
    }
  }
  //delete story by id

  async delete(req, res, next) {
    let { id } = req.params;
    try {
      const findingStory = await Model.findById(id);
      if (!findingStory) {
        return res.status(404).json({
          message: "not found"
        })
      }
      if(findingStory.image_url){
        fs.unlinkSync(findingStory.image_url); // remove image file
      }
      const result = await findingStory.delete();

      return res.status(200).json({
        message: "deleted successfully"
      })
    }
    catch (err) {
      return res.status(500).json({
        data: err.message
      })
    }
  }
}

const controller = new Controller();

export default controller;
