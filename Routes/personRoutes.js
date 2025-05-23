const express = require("express");
const router = express.Router();
const Person = require("./../person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//Post route to add a person
router.post("/signup", async (req, res) => {
  try {
    //Assuming the request body contains the person data
    const data = req.body;

    //Create a new Person document using the Mongoose model
    const newPerson = new Person(data);
    //  newPerson.name = data.name;
    //  newPerson.age = data.age;
    //  newPerson.mobile = data.mobile;
    //  newPerson.email = data.email;
    //  newPerson.address = data.addresss;

    //Save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is:", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login Routes
router.post("/login", async (req, res) => {
  try {
    //Extract username and password from the request body
    const { username, password } = req.body;

    //Find the user by username
    const user = await Person.findOne({ username: username });

    //If user does not exist or passsword does not match,return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal Server Error" });
  }
});

//Profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    //Extract the work type from the URL parameter
    const workType = req.params.worktype;
    //Assuming you already have a Person model and MongoDB connection setup
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      //Send the list of persons with the specified work type as a JSON response
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Invalid Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    //Extract the id from the URL Parameter
    const personId = req.params.id;
    //Updated data for the server
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run the Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //Extract the id from the URL Parameter
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ Message: "Person Data Deleted Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
