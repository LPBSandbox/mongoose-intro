//app-setup.js
const mongoose = require("mongoose");

//console.log(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);

var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected!");

  var characterSchema = mongoose.Schema({
    name: {type: String, required:true},
    role: {type: String, required:false},
    story: String
  });

  var Character = mongoose.model('Character', characterSchema);

 var chars = [
   { name: 'Adam Ewing', role: "Lawyer", story: "The Pacific Journal of Adam Ewing" },
   { name: 'Tilda Ewing', role: "Wife", story: "The Pacific Journal of Adam Ewing" },
   { name: 'Autua', role: "Stowaway", story: "The Pacific Journal of Adam Ewing" },
   { name: 'Luisa Rey', role: "Journalist", story: "Half-Lives: The First Luisa Rey Mystery" },
   { name: 'Rufus Sixsmith', role: "Physicist", story: "Half-Lives: The First Luisa Rey Mystery" },
   { name: 'Joe Napier', role: "Security", story: "Half-Lives: The First Luisa Rey Mystery" },
   { name: 'Timothy Cavendish', role: "Publisher", story: "The Ghastly Ordeal of Timothy Cavendish" },
   { name: 'Nurse Noakes', role: "Nurse", story: "The Ghastly Ordeal of Timothy Cavendish" },
   { name: 'Dermot Hoggins', role: "Gangster", story: "The Ghastly Ordeal of Timothy Cavendish" }
 ];

// solution similar to https://stackoverflow.com/questions/18983138/callback-after-all-asynchronous-foreach-callbacks-are-completed

 var saves = chars.map((c, i)=>{
    return new Promise((resolve, reject)=>{
      new Character(c).save((err, savedC)=>{
        if (err){
          console.error('error saving');
          console.error(savedC);
          reject();
        }
        console.log(`saved ${i}`);
        resolve();
      });
    }).catch((err)=>{console.error(err)});
  });

Promise.all(saves).then(()=>{
  Character.find({story: /Ghastly/i}, (err, characters)=>{
    if (err){console.log(err)}
    console.log("found characters!");
    console.log(characters);
  });

});

}).catch((err)=>{console.error(err+ "errored out!")});
