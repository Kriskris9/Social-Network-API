// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      thoughts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
{
    toJSON: {
        virtuals: true,
    },
    id: false
    }
);


const User = mongoose.model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);


// add virtual to get friend count. 
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


module.exports = User;
