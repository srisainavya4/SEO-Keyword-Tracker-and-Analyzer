const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET',
}));

app.get('/fetch-data', async (req, res) => {
  const { url } = req.query; // Extract the 'url' query parameter from the request

  if (!url) {
    res.status(400).send('URL parameter is missing');
    return;
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
