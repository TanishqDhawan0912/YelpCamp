const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect(
  "mongodb+srv://ratandhawan2004:5cbuXH8zE4vbbKb3@cluster0.vbbp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${
        places[Math.floor(Math.random() * places.length)]
      }`,
      image: "https://picsum.photos/400",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

module.exports = seedDB;
