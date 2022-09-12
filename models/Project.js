const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
      // type: [String], In case of multiple files
    }
  },
  {
    timestamps: true
  }
);

const Project = model('Project', projectSchema);

module.exports = Project;