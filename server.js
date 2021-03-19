const express = require('express');
const path = require('path');


const app = express();

app.use('/assets', express.static(path.resolve('./', 'assets')));

app.use('/dados', express.static(path.resolve('./', 'dados.json')));


app.get(("/*"), (req, res) => {
    res.sendFile(path.resolve('./', 'index.html'));
});

app.listen(process.env.PORT || 5555, () => console.log('Server in running localhost:5555'));
