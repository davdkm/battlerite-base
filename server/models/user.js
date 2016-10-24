const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
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

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
  const user = this,
      SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
