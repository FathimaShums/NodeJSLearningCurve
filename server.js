
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.static('public'));
const changes = [];

// Parse JSON bodies
app.use(bodyParser.json());

// Handle requests at the root path
app.post('/', (req, res) => {
  const changeData = req.body;
  
  console.log('Change detected:');
  console.log(`Row: ${changeData.row}, Column: ${changeData.column}`);
  console.log(`New value: ${changeData.newValue}`);
  console.log(`Timestamp: ${changeData.timestamp}`);
  changes.push(changeData);
  
  res.status(200).send({ message: 'Change recorded successfully' });
});
app.get('/changes', (req, res) => {
    res.json(changes);
  });
app.post('/sheet-changes', (req, res) => {
  const changeData = req.body;
  
  console.log('Change detected (sheet-changes endpoint):');
  console.log(`Row: ${changeData.row}, Column: ${changeData.column}`);
  console.log(`New value: ${changeData.newValue}`);
  
  res.status(200).send({ message: 'Change recorded successfully' });
});

// homepage,browser visits
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});