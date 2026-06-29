// server/routes/projects.js
const express = require('express');
const router = express.Router();

// Try to use MongoDB model; fall back to JSON
let Project;
try {
  Project = require('../models/Project');
} catch (e) {
  Project = null;
}

const projectsJson = require('../../client/src/data/projects.json');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    if (Project && require('mongoose').connection.readyState === 1) {
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.featured = true;
      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, data: projects });
    }

    // JSON fallback
    let data = projectsJson;
    if (category && category !== 'All') data = data.filter((p) => p.category === category);
    if (featured === 'true') data = data.filter((p) => p.featured);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    if (Project && require('mongoose').connection.readyState === 1) {
      const project = await Project.findOne({ id: req.params.id });
      if (!project) return res.status(404).json({ success: false, error: 'Not found' });
      return res.json({ success: true, data: project });
    }

    const project = projectsJson.find((p) => p.id === req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create project (protected — add auth middleware when ready)
router.post('/', async (req, res) => {
  try {
    if (!Project) return res.status(503).json({ error: 'DB not connected' });
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    if (!Project) return res.status(503).json({ error: 'DB not connected' });
    const project = await Project.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    if (!Project) return res.status(503).json({ error: 'DB not connected' });
    await Project.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
