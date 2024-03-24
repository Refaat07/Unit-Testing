const mongoose = require('mongoose');

module.exports = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/cloudUnitTest',
    {useNewUrlParser: true})
    .then(()=> console.log('DB connected'))
    .catch(err => console.error(err))
}