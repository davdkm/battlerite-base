const mongoose = require('mongoose'),
    Schema = mongoose.schema,
    bcrypt = require('bcrypt-nodejs');

// User schema
const UserSchema = new Schema({
  email: {
    type: String,
    uniqe: true,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String}
  },
  role: {
    type: String,
    enum: ['Member', 'Client', 'Owner', 'Admin'],
    default: 'Member'
  },
  resetPasswordToken: { type: String },
  resetPasswordToken: { type: Date }
},
{
  timestamps: true
});
