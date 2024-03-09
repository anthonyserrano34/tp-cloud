const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/exit', (req, res) => {
  process.exit(0);
});

app.get('/cpu-maximum', (req, res) => {
    let i = 0;
    while (i < 1000000000000000){
        i++;
        console.log(i);
    }
    res.send('Poor CPU :(');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
