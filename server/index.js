const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const mysql2 = require('mysql2');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const koajwt = require("koa-jwt");
let app = new Koa();
app.use(koaBody({
  multipart: true
}))
const connection = mysql2.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'trello',
  charset: 'utf8'
})
let router = new Router();
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'content-type,Content-length,Authorization,withCredentials');
  ctx.set('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,HEAD");

  try {
    await next();
  } catch (err) {
    if (err.name === 'UnauthorizedError') {
      ctx.status = 401;
      ctx.body = 'invalid token...';
    }
  }
})
router.options('*', ctx => {
  ctx.body = '';
});

router.post('/user', async ctx => {
  let { username, pwd, email } = ctx.request.body;
  pwd = md5(pwd);
  // let result = await new Promise(resolve=>{
  //   connection.query('INSERT INTO users(username,pwd,email) VALUES (?,?,?)',[username,pwd,email],(err,results)=>{
  //     if(err){
  //       let resData = {
  //         info:'添加失败',
  //         status: 1
  //       }
  //       return console.log(err);
  //     }
  //     if(results.affectedRows>0){
  //       let resData = {
  //         info:'添加成功',
  //         status: 0
  //       }
  //       console.log('添加成功');
  //       resolve(resData);
  //     }
  //   });
  // })
  let [rows] = await connection.promise().query('INSERT INTO users(username,pwd,email) VALUES (?,?,?)', [username, pwd, email]);
  let resData;
  if (rows.affectedRows > 0) {
    resData = {
      info: '添加成功',
      status: 0
    }
  } else {
    resData = {
      info: '添加失败',
      status: 1
    }
  }
  ctx.body = resData;
});

router.post('/checkUsers', async ctx => {
  console.log(ctx.request.body);
  let = { username, pwd } = ctx.request.body;
  pwd = md5(pwd);
  let [rows] = await connection.promise().query('SELECT * FROM users WHERE username=? AND pwd=?', [username, pwd]);
  console.log(rows[0]);
  let resData;
  if (rows[0]) {
    // 签发token
    const token = jwt.sign({
      name: rows[0].username,
      id: rows[0].id
    }, 'sometoken', { expiresIn: '2h' })
    resData = {
      info: '登录成功',
      status: 0,
      token: token
    }
  } else {
    resData = {
      info: '用户名或密码错误',
      status: 1
    }
  }
  ctx.body = resData;
})
router.get('/list', koajwt({ secret: 'sometoken' }), async ctx => {
  let token = ctx.headers.authorization.substring(7);
  let decoded = await new Promise(resolve => {
    jwt.verify(token, 'sometoken', (err, decoded) => {
      if (err) {
        return
      }
      resolve(decoded)
    })
  })
  let uid = decoded.id;
  let [rows] = await connection.promise().query('SELECT * FROM list WHERE uid=? ORDER BY sortid', [uid]);
  console.log(rows)
  for (let i = 0; i < rows.length; i++) {
    let [result] = await connection.promise().query('SELECT * FROM task WHERE lid=? ORDER BY sortid', [rows[i].id]);
    rows[i]['task'] = result;
  }
  ctx.body = rows;
})

// 更新列表排序数据
router.put('/updateSort', async ctx => {
  let { id1, id2, sortid1, sortid2 } = ctx.request.body;
  let [rows1] = await connection.promise().query('UPDATE list SET sortid=? WHERE id=?', [sortid2, id1]);
  let [rows2] = await connection.promise().query('UPDATE list SET sortid=? WHERE id=?', [sortid1, id2]);
  let info;
  if (rows1.affectedRows > 0 && rows2.affectedRows > 0) {
    info = {
      status: 0,
      message: '更新成功'
    }
  } else {
    info = {
      status: 1,
      message: '更新失败'
    }
  }

  ctx.body = info;
})
app.use(router.routes());
app.listen(5566);