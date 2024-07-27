const mongoose = require('mongoose');

require('dotenv').config();


exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>{console.log('DB coneected suscusfully')})
    .catch((err)=>{
        console.log('Abe Yede Thik se Kar');
        console.error(err);
        process.exit(1);
    })

}