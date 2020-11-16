import axios from 'axios'
import start from './utils'
const Fly = require('flyio/src/node/index.js')
test('axios', () => {
  const response = axios.create({
    baseURL: 'http://localhost:4444'
  });
  start(response, 4444, true)
})
test('flyio', () => {
  const response = new Fly();
  response.config.baseURL = 'http://localhost:4445'
  start(response, 4445)
})

