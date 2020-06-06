import axios from 'axios'
import start from './utils'
const Fly = require('flyio/src/node/index.js')
test('axios', () => {
  const engine = axios.create({
    baseURL: 'http://localhost:4444'
  });
  start(engine, 4444, true)
})
test('flyio', () => {
  const engine = new Fly();
  engine.config.baseURL = 'http://localhost:4445'
  start(engine, 4445)
})

