const express = require('express');
const os = require('os');
const cote = require('cote');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));

// const timeService = new cote.Responder({ name: 'Time Service' });

// timeService.on('time', (req, cb) => {
//   cb(new Date());
// });
