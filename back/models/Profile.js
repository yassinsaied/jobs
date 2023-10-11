const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  company: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  githubusenemae: {
    type: String,
  },
  experiences: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      begin: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],

  eduction: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieledofstudy: {
        type: String,
        required: true,
      },
      beginstudy: {
        type: Date,
        required: true,
      },
      endstudy: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  sociale: {
    youtube: {
      type: String,
    },
    facbook: {
      type: String,
    },
    instagrame: {
      type: String,
    },
    linkidin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
