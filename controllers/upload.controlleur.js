const { ObjectID } = require("mongodb");
const { User, Photo, Resume } = require("../models/DeliveryBoy");

module.exports = uploadControlleur = {
uploadImage : async (req, res) => {
  userId= ObjectID(req.params.id)
  Promise.all(
    req.files.map(async (file) => {
      const newUpload = new Photo({
        name: file.filename,
        path: file.path,
        userId: userId,
      })
      return await newUpload.save();
    })
  )
  try {
    const completePhotos = await User.findByIdAndUpdate(userId, { photosComplete: true }, { new: true })
    res.status(200).json(completePhotos);
    
  } catch (error) {
    res.status(500).json({ errors: error });
  }
  
},
uploadResume : async (req, res) => {
  const userId = ObjectID(req.params.id)
  const name  = req.file.filename
  const path = req.file.path
    try {
    const newResume = new Resume({
      name: name,
      path: path,
      userId:userId
    });
    try {
      Resume.create(newResume, (err, doc) => {
        if (err) res.status(503).json({ errors: error });
        else {
          User.findByIdAndUpdate(
            userId,
            { $push: { resume: doc }, resumeComplete:true },
            { new: true },
            (err, data) => {
              if (err) res.status(504).json({ errors: error });
              else {
                res.status(200).json(newResume);
              }
            }
          );
        }
      });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  } catch (error) {
    res.status(501).json({ errors: error });
  }
}
}
