// import { createAll, createProxy } from '../../a/boxCat.esm.min'
import { createAll, createProxy } from '../src/index'
// const { createAll, createProxy} = require('../../src/index.js')
// const { createAll, createProxy } = require('../../a/boxCat.cjs.min.js')

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
const getUsers = {
  name: 'BoxCat',
  author: 'mwc',
  url: 'https://github.com/hengshanMWC/film'
}
const apisDefault = {
  ...commonApis,
  ...defaultApi
}
const apisParam = {
  ...commonApis,
  ...paramApi
}
export default function start (engine: Object, port: number, isParams?: boolean) {
  const [defaultHttp, paramHttp] = createBoxCat(engine)
  const [defaultProxyHttp, paramProxyHttp] = createBoxCat(engine, true)
  createServer(port, ...getPrmises(defaultHttp, paramHttp, isParams), ...getPrmises(defaultProxyHttp, paramProxyHttp, isParams))
}
function createBoxCat (engine, isProxy?: boolean) {
  const param: any = {
    mergeMethods: {
      'post': ['post', 'login']
    },
    rule: '{param}',
    methodsRule: 'includes',
    config: {
      timeout: 1000
    }
  }
  let defaultHttp
  let paramHttp
  if (isProxy) {
    defaultHttp = createProxy(apisDefault, engine)
    paramHttp = createProxy(apisParam, engine, param)
  } else {
    defaultHttp = createAll(apisDefault, engine)
    paramHttp = createAll(apisParam, engine, param)
  }
  return [defaultHttp, paramHttp]
}
function getPrmises (defaultHttp, paramHttp, isParams?: boolean) {
  const getUsersData = isParams ? { params: getUsers } : getUsers
  return [function () {
    return Promise.all([
      defaultHttp.getUsers(getUsersData),
      defaultHttp.postUser(getUsers),
      defaultHttp.putUser(1, {
        author: 'abmao'
      }),
      defaultHttp.deleteUser(1),
      defaultHttp.getListDetail({
        list: 1,
        id: 2
      }),
      defaultHttp.getListDetail({
        list: 1
      }),
      defaultHttp.postLogin()
    ])
  }, function () {
    return Promise.all([
      paramHttp.getUsers(getUsersData),
      paramHttp.postUser(getUsers),
      paramHttp.putUser(1, {
        author: 'abmao'
      }),
      paramHttp.deleteUser(1),
      paramHttp.getListDetail({
        list: 1,
        id: 2
      }),
      paramHttp.getListDetail({
        list: 1
      }),
      paramHttp.login()
    ])
  }]
}
function createServer (code, ...fns) {
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