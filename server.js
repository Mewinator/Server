// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let data = []; // Each object: { hostname, tld, creator, source, datecreated, uuid }

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/data', (req, res) => {
  const { hostname, tld, creator, source, datecreated, uuid } = req.body;
  if (!hostname || !tld || !creator || !source || !datecreated || !uuid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newItem = { hostname, tld, creator, source, datecreated, uuid };
  data.push(newItem);
  res.status(201).json(newItem);
});

app.put('/data/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const { hostname, tld, creator, source, datecreated, uuid } = req.body;

  if (
    isNaN(index) || index < 0 || index >= data.length ||
    !hostname || !tld || !creator || !source || !datecreated || !uuid
  ) {
    return res.status(400).json({ error: 'Invalid input or index' });
  }

  data[index] = { hostname, tld, creator, source, datecreated, uuid };
  res.json(data[index]);
});

app.delete('/data/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= data.length) {
    return res.status(400).json({ error: 'Invalid index' });
  }

  const removed = data.splice(index, 1)[0];
  res.json(removed);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
