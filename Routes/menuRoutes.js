const express = require("express");
const router = express.Router();
const MenuItems = require("./../Menu");

//Post Method to add a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItems(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get method to get the menu Items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    //URL parameter
    const tasteType = req.params.taste;
    if (tasteType == "sour" || tasteType == "spicy" || tasteType == "sweet") {
      const response = await MenuItems.find({ taste: tasteType });
      //Send the list of MenuItems with the specified taste as a JSON response
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {}
});

module.exports = router;
