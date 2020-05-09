import BoxCat from '../../src/index'
import axios from 'axios'
// import Fly from 'fly'
const http = require('http')
const url = require('url')
function createServer (code, cd) {
  return http.createServer(function (req, res) {
    var parsed = url.parse(req.url, true);
    if (req.method === 'GET' && parsed.pathname === '/user') {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(parsed.query));
    } else if (req.method === 'POST' && parsed.pathname === '/user') {
      let str = ''
      req.on('data', data => {
        str += data
      })
      req.on('end', () => {
        expect(JSON.parse(str).author).toBe('mwc')
        res.end('post user');
      })
    } else if (req.method === 'PUT' && parsed.pathname.include('user')) {
      let str = ''
      req.on('data', data => {
        str += data
      })
      req.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.parse(str));
      })
    }
  }).listen(code, cd)
}
const commonApis = {
  getUsers: 'user',
  postUser: 'user'
}
const defaultApi = {
  putUser: 'user/:id',
  getListDetail: 'list/:list/:id',
  deteleUser: 'user/:id'
}
const apis1 = {
  ...commonApis,
  ...defaultApi
}
const engine = axios.create({
  baseURL: 'http://localhost:4444/'
});
const getUsers = {
  name: 'BoxCat',
  author: 'mwc',
  url: 'https://github.com/hengshanMWC/film'
}
describe('axios', () => {
  test('default', () => {
    const server = createServer(4444, function () {
      const http = new BoxCat(apis1, engine)
      Promise.all([
        http.getUsers({
          params: getUsers
        }),
        http.postUser(getUsers),
        http.putUser(1, {
          author: 'abmao'
        })
      ])
        .then(([getUser, postUser, putUser]) => {
          expect(getUser.data).toEqual(getUsers)
          expect(postUser.data).toBe('post user')
          expect(putUser.data.author).toBe('abmao')
          server.close()
        })
    })
  })
})

