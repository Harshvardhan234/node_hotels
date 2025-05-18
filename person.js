// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Library for hashing and comparing passwords

// Define the schema for a "Person"   document in MongoDB
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Person's name (required)
  age: Number, // Optional age field
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"], // Must be one of the specified roles
    required: true,
  },
  mobile: { type: String, required: true }, // Mobile number (required)
  email: { type: String, required: true, unique: true }, // Email (required & must be unique)
  address: String, // Optional address field
  salary: { type: Number, required: true }, // Salary (required)
  username: { type: String, required: true }, // Username for login (required)
  password: { type: String, required: true }, // Hashed password (required)
});

// Mongoose "pre-save" middleware to hash the password before saving it to DB
personSchema.pre("save", async function (next) {
  const person = this;

  // If password hasn't changed, skip hashing
  if (!person.isModified("password")) return next();

  try {
    // Generate salt (adds randomness to the hash to protect against rainbow table attacks)
    const salt = await bcrypt.genSalt(10);

    // Create hashed version of the password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Replace plain password with the hashed version
    person.password = hashedPassword;

    next(); // Move to the next middleware or save operation
  } catch (error) {
    return next(error); // Pass error to Mongoose error handler
  }
});

// Instance method to compare entered password with the hashed one stored in DB
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // bcrypt.compare returns true if passwords match, false otherwise
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create the Mongoose model from the schema and export it for use in other files
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
