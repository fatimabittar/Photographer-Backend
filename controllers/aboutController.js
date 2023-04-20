import Model from "../models/aboutModel.js";


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
  put(req, res, next) {
    let { id } = req.params; let body = req.body;
    Model.updateOne({ _id: id }, {
      $set: body
    },

      (err, response) => {
        if (err) return next(err);
        res.status(200).json({  data: body, message: `Updated successfuly` });
      });
  }
  //delete story by id

  async delete(req, res, next) {
    let { id } = req.params;
    const findingStory = await Model.findById(id);
    if (!findingStory) {
      return res.status(404).json({
        message: "not found"
      })
    }
    const result = await findingStory.delete();

    return res.status(200).json({
      message: "deleted successfully"
    })
  }


}

const controller = new Controller();

export default controller;