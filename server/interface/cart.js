import Router from 'koa-router';
import Cart from '../db/models/cart'
import md5 from 'crypto-js/md5'

const router = new Router({prefix: '/cart'})

router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const time = Date()
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const { params: { id, detail } } = ctx.request.body
    const { username } = ctx.session.passport.user
    const cart = new Cart({
      id,
      cartNo,
      time,
      user: username,
      detail
    })
    const result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getCart', async ctx => {
  const {id} = ctx.request.body
  try {
    let result = await Cart.findOne({cartNo: id})
    ctx.body = {
      code: 0,
      data: result
        ? result.detail[0]
        : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
