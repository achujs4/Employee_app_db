const mongoose=require('mongoose');
mongoose.connect(process.env.mongoDB_URL).then(()=>{
	console.log('Connected to database');
}).catch((err)=>{
	console.log('Error in connecting to database');
});