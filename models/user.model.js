const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

const db = require('../database/database');

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection('users')
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }

  // a method to find a user that matches the email address from the database
  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  // a method to connect to the database and connect to the users collection in mongodb, create a single user by filling the credentials
  async signup() {
    // hash the password so its not stored as a simple string in database
    const hashedPassword = await bcrypt.hash(this.password, 12);

    // inserting a new uset to the users collection in the MongoDB database
    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  // compare if the hashed password from the database mathces the one that is inputed by the user. using bcrypt to 'unhash' the password
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
