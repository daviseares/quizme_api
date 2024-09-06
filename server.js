const express = require('express');
const app = express();
const port = 3000;

// Import the handler
const handler = require('./api/handler');

// Use the handler for a specific route
app.get('/questions', handler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});