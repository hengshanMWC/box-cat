import BoxCat from '../../src/index'
import axios from 'axios'
// import Fly from 'fly'
const http = require('http')
const url = require('url')
const server1 = {
  getValue: 'value'
}
describe('axios', () => {
  const engine = axios.create({
    baseURL: 'http://localhost:4444/'
  });
  test('default', () => {
    http.createServer(function (req, res) {
      var parsed = url.parse(req.url);
      if (parsed.pathname === '/value') {
        res.end('value');
      }
    }).listen(4444, function () {
      const http = new BoxCat(server1, engine)
      console.log(http)
      // http.getValue()
      //   .then(({data}) => {
      //     data.toBe('value')
      //   })
    });
  })
})

