var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
let mock = new MockAdapter(axios);
// 模拟成功请求
mock.onGet('/success').reply(200, {
  msg: 'success'
});
// 模拟错误请求
mock.onGet('/error').reply(500, {
  msg: 'failure'
});
//模拟登录                POST
mock.onPost('/login').reply(config => {
  let {username, password} = JSON.parse(config.data);
  return new Promise((resolve, reject) => {
    let user = null;
    setTimeout(() => {
      let hasUser = LoginUsers.some(u => {
        if (u.username === username && u.password === password) {
          user = JSON.parse(JSON.stringify(u));
          user.password = undefined;
          return true;
        }
      });
      if (hasUser) {
        resolve([200, { code: 200, msg: '请求成功', user }]);
      } else {
        resolve([200, { code: 500, msg: '账号或密码错误' }]);
      }
    }, 1000);
  });
});
axios.post('/login', params).then(res => res.data);
//模拟批量删除                           GET
mock.onGet('/user/batchremove').reply(config => {
  let { ids } = config.params;
  ids = ids.split(',');
  _Users = _Users.filter(u => !ids.includes(u.id));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        code: 200,
        msg: '删除成功'
      }]);
    }, 500);
  });
});
axios.get(`${base}/user/batchremove`, { params: params }); 