const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLICKUP_API = 'https://api.clickup.com/api/v2';
const API_KEY = process.env.CLICKUP_API_KEY;

const clickupClient = axios.create({
  baseURL: CLICKUP_API,
  headers: {
    'Authorization': API_KEY,
    'Content-Type': 'application/json'
  }
});

// GET /api/clickup/lists/:spaceId
router.get('/lists/:spaceId', async (req, res) => {
  try {
    const { spaceId } = req.params;
    const response = await clickupClient.get(`/space/${spaceId}/list`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch lists',
      message: error.message
    });
  }
});

// GET /api/clickup/tasks/:listId
router.get('/tasks/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { status, assignee } = req.query;

    let url = `/list/${listId}/task`;
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (assignee) params.append('assignee', assignee);

    const response = await clickupClient.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch tasks',
      message: error.message
    });
  }
});

// GET /api/clickup/task/:taskId
router.get('/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const response = await clickupClient.get(`/task/${taskId}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch task',
      message: error.message
    });
  }
});

// POST /api/clickup/task
router.post('/task', async (req, res) => {
  try {
    const { listId, name, description, assignees, dueDate, priority, status } = req.body;

    if (!listId || !name) {
      return res.status(400).json({ error: 'Missing required fields: listId, name' });
    }

    const payload = {
      name,
      description: description || '',
      assignees: assignees || [],
      due_date: dueDate || null,
      priority: priority || null,
      status: status || null
    };

    const response = await clickupClient.post(`/list/${listId}/task`, payload);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to create task',
      message: error.message
    });
  }
});

// PATCH /api/clickup/task/:taskId
router.patch('/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { name, description, status, priority, dueDate, assignees } = req.body;

    const payload = {};
    if (name) payload.name = name;
    if (description) payload.description = description;
    if (status) payload.status = status;
    if (priority) payload.priority = priority;
    if (dueDate) payload.due_date = dueDate;
    if (assignees) payload.assignees = assignees;

    const response = await clickupClient.put(`/task/${taskId}`, payload);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to update task',
      message: error.message
    });
  }
});

// DELETE /api/clickup/task/:taskId
router.delete('/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    await clickupClient.delete(`/task/${taskId}`);
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to delete task',
      message: error.message
    });
  }
});

module.exports = router;
