const express = require('express');
const axios = require('axios');
const router = express.Router();

const NOTION_API = 'https://api.notion.com/v1';
const API_KEY = process.env.NOTION_TOKEN;

const notionClient = axios.create({
  baseURL: NOTION_API,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }
});

// GET /api/notion/page/:pageId
router.get('/page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const response = await notionClient.get(`/pages/${pageId}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch page',
      message: error.message
    });
  }
});

// PATCH /api/notion/page/:pageId
router.patch('/page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const { properties, archived } = req.body;

    const payload = {};
    if (properties) payload.properties = properties;
    if (archived !== undefined) payload.archived = archived;

    const response = await notionClient.patch(`/pages/${pageId}`, payload);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to update page',
      message: error.message
    });
  }
});

// POST /api/notion/search
router.post('/search', async (req, res) => {
  try {
    const { query, filter, sort } = req.body;

    const payload = { query: query || '' };
    if (filter && Object.keys(filter).length) payload.filter = filter;
    if (sort && Object.keys(sort).length) payload.sort = sort;

    const response = await notionClient.post('/search', payload);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to search',
      message: error.message
    });
  }
});

// POST /api/notion/page
router.post('/page', async (req, res) => {
  try {
    const { parent, properties, children } = req.body;

    if (!parent || !properties) {
      return res.status(400).json({
        error: 'Missing required fields: parent, properties'
      });
    }

    const payload = {
      parent,
      properties,
      children: children || []
    };

    const response = await notionClient.post('/pages', payload);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to create page',
      message: error.message
    });
  }
});

// GET /api/notion/database/:databaseId
router.get('/database/:databaseId', async (req, res) => {
  try {
    const { databaseId } = req.params;
    const response = await notionClient.get(`/databases/${databaseId}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch database',
      message: error.message
    });
  }
});

// POST /api/notion/database/:databaseId/query
router.post('/database/:databaseId/query', async (req, res) => {
  try {
    const { databaseId } = req.params;
    const { filter, sorts, start_cursor, page_size } = req.body;

    const payload = {
      filter: filter || {},
      sorts: sorts || [],
      start_cursor: start_cursor || undefined,
      page_size: page_size || 100
    };

    const response = await notionClient.post(
      `/databases/${databaseId}/query`,
      payload
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to query database',
      message: error.message
    });
  }
});

module.exports = router;
