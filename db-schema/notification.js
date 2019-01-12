const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationObject = {
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
};

const modelOptions = {
  timestamps: true
};

const NotificationSchema = Schema(NotificationObject, modelOptions);

module.exports = NotificationSchema;
