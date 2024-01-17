/////////////////////////////////////
// // Schema Validation -> Basically, Rules for Schema
/////////////////////////////////////

// // // For more info About mongoose visit to mongoosejs.com
const mongoose = require('mongoose');

//  // //Establish a Connection Between Mongo and Node 
main()
    .then((res) =>{
        console.log("Connection Succesfull");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

//  // //True Syntax of Defining the syntax of schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    author: {
        type: String, 
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
        enum: ["fiction","non-fiction"]
//  // //Schema Type -> enum: Array, creates a validator that checks if the value is in the given array.
    },
});

const Book = mongoose.model("Book",bookSchema);

let book1= new Book({
    title: "Mathematics XII", //  // //If we miss this gives error -> validation failed Beacause upper we define required: true
    author: "RD Sharma",
    price: 1200,
    category: "fiction",
});

book1
    .save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

let book2= new Book({
        title: "Schinchan", //  // //If we miss this gives error -> validation failed Beacause upper we define required: true
        author: "japanees",
        price: 1200,
        category: "non-fiction", //  // //if we type here comic it will give error because of enum
    });
    
book2
    .save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
        // // // console.log(err.errors.price.properties.message); to check when error comes 
    });


// // // // {runValidators : true }«Boolean» if true, runs update validators on this command. Update validators validate the update operation against the model's schema