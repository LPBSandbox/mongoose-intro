//app.js
const mongoose = require("mongoose");

console.log(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);

var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
db.on('error', (err)=>{console.error(`connection error:${err}`);});
db.once('open', async function() {
  console.log("connected!");

  var characterSchema = mongoose.Schema({
    name: {type: String, required:true},
    role: {type: String, required:false}
  });
  var Character = mongoose.model('Character', characterSchema);

  var c1 = new Character({ name: 'Adam Ewing', role: "Lawyer", story: "The Pacific Journal of Adam Ewing" });
  var s = await c1.save();
  console.log("saved character!");
  console.log(s);
  Character.find({}, (err, characters)=>{
    if (err){console.log(err)}
    console.log("found characters!");
    console.log(characters);
  });


}).catch((err)=>{console.error(err+ "errored out!")});
