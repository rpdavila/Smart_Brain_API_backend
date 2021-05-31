const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd001e89486a742ce996228efb7c952a5'
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(() => res.status(400).json('Unable to work with API'))
}
  
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(() => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}