const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 3000;

const serverInit = app => {
  app.use(morgan('dev'))
  // important line! req.body not available otherwise
  app.use(express.json({ limit: '10kb' }));
  app.use(cors())
  app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
  });
}

module.exports = serverInit;