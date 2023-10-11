const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },

      datecomment: {
        type: Date,
        default: Date.now,
      },
      isArchived: {
        type: Boolean,
        default: false,
      },
    },
  ],
  isArchived: {
    type: Boolean,
    default: false,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
