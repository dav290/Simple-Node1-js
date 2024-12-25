
const express = require('express');
const app = express();
const port = 3000;


 const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  
  if (!dateParam) {
    dateParam = Date.now();
  }

  let date;

  
  if (!isNaN(dateParam) && dateParam.length === 13) {
    date = new Date(Number(dateParam)); 
  } else {
    date = new Date(dateParam); 
  }

  
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

