const http = require('http')
const url = require('url')
const commonApis = {
  getUsers: '/user',
  postUser: '/user'
}
const defaultApi = {
  putUser: '/user/:id',
  getListDetail: '/list/:list/:id',
  deleteUser: '/user/:id',
  postLogin: '/login'
}
const paramApi = {
  putUser: '/user/{id}',
  getListDetail: '/list/{list}/{id}',
  deleteUser: '/user/{id}',
  login: '/login'
}
export const getUsers = {
  name: 'BoxCat',
  author: 'mwc',
  url: 'https://github.com/hengshanMWC/film'
}
export const apisDefault = {
  ...commonApis,
  ...defaultApi
}
export const apisParam = {
  ...commonApis,
  ...paramApi
}
export function createServer (code, ...fns) {
  const server = http.createServer(function (req, res) {
    var parsed = url.parse(req.url, true);
    if (parsed.pathname === '/login') {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(getUsers));
    } else if (req.method === 'GET') {
      if (parsed.pathname === '/user') {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(parsed.query));
      } else if (parsed.pathname.includes('/list/')) {
        res.end(parsed.pathname);
      }
    } else if (req.method === 'POST' && parsed.pathname === '/user') {
      let str = ''
      req.on('data', data => {
        str += data
      })
      req.on('end', () => {
        expect(JSON.parse(str).author).toBe('mwc')
        res.end('post user');
      })
    } else if (req.method === 'PUT' && parsed.pathname.includes('user')) {
      let str = ''
      req.on('data', data => {
        str += data
      })
      req.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.end(str);
      })
    } else if (req.method === 'DELETE' && parsed.pathname.includes('user')) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end('true');
    }
  }).listen(code, function () {
    fns.forEach(fn => {
      fn()
        .then(([getUser, postUser, putUser, deleteUser, getListDetail, getListDetail2, postLogin]) => {
          expect(getUser.data).toEqual(getUsers)
          expect(postUser.data).toBe('post user')
          expect(putUser.data.author).toBe('abmao')
          expect(deleteUser.data).toBeTruthy()
          expect(getListDetail.data).toBe('/list/1/2')
          expect(getListDetail2.data).toBe('/list/1')
          expect(postLogin.data).toEqual(getUsers)
          server.close()
        })
    })
  })
}