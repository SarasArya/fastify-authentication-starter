const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserObject = {
  name: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

const modelOptions = {
  timestamps: true
};

const UserSchema = Schema(UserObject, modelOptions);

UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret['password'];
    return ret;
  }
});

UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = UserSchema;
