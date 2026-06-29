// server/models/Project.js
const mongoose = require('mongoose');

const CaseStudySchema = new mongoose.Schema({
  problem: String,
  concept: String,
  promptEngineering: String,
  imageGeneration: String,
  videoGeneration: String,
  editing: String,
  motionGraphics: String,
  soundDesign: String,
  lessonsLearned: String,
});

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    client: { type: String },
    thumbnail: { type: String },
    video: { type: String },
    previewVideo: { type: String },
    software: [{ type: String }],
    aiTools: [{ type: String }],
    role: { type: String },
    duration: { type: String },
    year: { type: String },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    creativeGoal: { type: String },
    caseStudy: CaseStudySchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
