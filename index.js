// // For more info About mongoose visit to mongoosejs.com
const mongoose = require('mongoose');

// // Establish a Connection Between Mongo and Node 
main()
    .then((res) =>{
        console.log("Connection Succesfull");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

// // Defining Schema for document
const userschema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// // Defining Model - Automatically Mongoose create a collection MongoDB :  1 -> Capital to lowercase , 2 -> Singular to Plural
// //  if we pass User it creates = users (in MongoDB) e.g, [User -> users], [Employee -> employees]

const User = mongoose.model("User", userschema);


// //INSERT
// //creating instances of Model User
const user1 = new User({
    name:"Vikas Kumar",
    email:"Vikas@gmail.com",
    age:24,
});

// // To save user1 to mongoDB Before it you can check by - cmd ->
// // 1. node
// // 2. .load index.js
// // 3. user1  
user1.save(); // It Return Promise // Its also create a field of __v:0 (Which we can a version )

const user2 = new User({
    name:"Rishab Kumar",
    email:"Rishab@gmail.com",
    age:24,
});

user2.save()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

// // Inserting more than one data at the time
User.insertMany([
    {name:"Anushka", email:"Anushka@gmail.com",age:8},
    {name:"Ayush", email:"Ayush@gmail.com",age:8},
]).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});




// // Mongoose uses Operation Buffering -> 
          // // It lets you start using your modoles immediately, without waiting for mongoose to establish a connection to MongoDB.




// //FIND 
// // Model.find() // returns  a Query Object (thennable)
// // *Mongoose Queries are not Promises. But they have a .then() method

User.find({})
      .then((res) => {
            console.log(res);
    }).catch((err) => {
            console.log(err);
    });

// // Applying Condition 1
User.find({ age: {$lt:24}})
    .then((res) => {
          console.log(res);
  }).catch((err) => {
          console.log(err);
  });

// // Applying Condition 2
User.find({ age: {$lt:24}})
    .then((res) => {
        console.log(res[0].id);
        console.log(res[0].name);
        console.log(res[0].email);
        console.log(res[0].age);
        console.log(res[0].__v);
  }).catch((err) => {
        console.log(err);
  });

// // Find one -> It give Only One Outputs with matched Condition
// // Finding users less than age 24
User.findOne({ age: {$lt:24}})
    .then((res) => {
          console.log(res);
  }).catch((err) => {
          console.log(err);
  });

// // Finding User By id 
User.findOne({ _id:"65a681eb024f4790320200dc"})
    .then((res) => {
          console.log(res);
  }).catch((err) => {
          console.log(err);
  });

// // Finding User By id -> We Have One Method also 
User.findById("65a681eb024f4790320200dc")
    .then((res) => {
          console.log(res);
  }).catch((err) => {
          console.log(err);
  });




// // UPDATE
// // Model.updateOne() & Model.updateMany() -> returns  a Query Object (thennable)
// // *Mongoose Queries are not Promises. But they have a .then() method

// // Update One
User.updateOne(
    {name:"Vikas Kumar"},
    {age: 25}) // // Here not use this  {age: { $eq:25 }}
    .then((res) => {
          console.log(res); // // At Result we get metadata
  }).catch((err) => {
          console.log(err);
  });

// // Update Many
User.updateMany({ age: {$lt:24}},{ age: 9})
    .then((res) => {
        console.log(res); // // At Result we get metadata 
    })
    .catch((err) => {
        console.log(err);
    })

// // If we want data in our result instead of metadata
User.findOneAndUpdate({name:"Rishab Kumar"}, {age : 48}, {new : true}) // //{new : true} -> By Default false, if true, return the modified document rather than the original
    .then((res) => {
        console.log(res); // res -> updated data
    })
    .catch((err) => {
        console.log(err);
    });

User.findByIdAndUpdate("65a67dba1918dea3ffcbb9ff", {age : 100}, {new : true}) // //{new : true} -> By Default false, if true, return the modified document rather than the original
    .then((res) => {
        console.log(res); // //res -> updated data
    })
    .catch((err) => {
        console.log(err);
    });





// // DELETE
// // Model.deleteOne() & Model.deleteMany() -> returns  a Query Object (thennable)
// // *Mongoose Queries are not Promises. But they have a .then() method

// // First user delete 
User.deleteOne().then((res) => {
            console.log(res); 
        })
        .catch((err) => {
            console.log(err);
        });

// //Applying Condition
User.deleteOne({name:"Vikas Kumar"}).then((res) => {
    console.log(res); 
})
.catch((err) => {
    console.log(err);
});

// // Delete Many
User.deleteMany({age: {$eq:9}}).then((res) => {
    console.log(res); 
})
.catch((err) => {
    console.log(err);
});

