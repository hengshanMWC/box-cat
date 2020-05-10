import BoxCat from '../../src/index'
import axios from 'axios'
import { createServer, getUsers, apisDefault, apisParam } from './utils'
const Fly = require('flyio/src/node/index.js')
test('axios', () => {
  const engine = axios.create({
    baseURL: 'http://localhost:4444'
  });
  const defaultHttp = new BoxCat(apisDefault, engine)
  const paramHttp = new BoxCat(apisParam, engine, {
    mergeMethods: {
      'post': ['post', 'login']
    },
    rule: '{param}',
    methodsRule: 'includes',
    config: {
      timeout: 1000
    }
  })
  createServer(4444, function () {
    return Promise.all([
      defaultHttp.getUsers({
        params: getUsers
      }),
      defaultHttp.postUser(getUsers),
      defaultHttp.putUser(1, {
        author: 'abmao'
      }),
      defaultHttp.deleteUser(1),
      defaultHttp.getListDetail({
        list: 1,
        id: 2
      }),
      defaultHttp.postLogin()
    ])
  }, function () {
    return Promise.all([
      paramHttp.getUsers({
        params: getUsers
      }),
      paramHttp.postUser(getUsers),
      paramHttp.putUser(1, {
        author: 'abmao'
      }),
      paramHttp.deleteUser(1),
      paramHttp.getListDetail({
        list: 1,
        id: 2
      }),
      paramHttp.login()
    ])
  })
})
test('flyio', () => {
  const engine = new Fly();
  engine.config.baseURL = 'http://localhost:4445'
  const defaultHttp = new BoxCat(apisDefault, engine)
  const paramHttp = new BoxCat(apisParam, engine, {
    mergeMethods: {
      'post': ['post', 'login']
    },
    rule: '{param}',
    methodsRule: 'includes',
    config: {
      timeout: 1000
    }
  })
  createServer(4445, function () {
    return Promise.all([
      defaultHttp.getUsers(getUsers),
      defaultHttp.postUser(getUsers),
      defaultHttp.putUser(1, {
        author: 'abmao'
      }),
      defaultHttp.deleteUser(1),
      defaultHttp.getListDetail({
        list: 1,
        id: 2
      }),
      defaultHttp.postLogin()
    ])
  }, function () {
    return Promise.all([
      paramHttp.getUsers(getUsers),
      paramHttp.postUser(getUsers),
      paramHttp.putUser(1, {
        author: 'abmao'
      }),
      paramHttp.deleteUser(1),
      paramHttp.getListDetail({
        list: 1,
        id: 2
      }),
      paramHttp.login()
    ])
  })
})

