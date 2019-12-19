import Router from 'koa-router'
import axios from './utils/axios'
import sign from './utils/sign'

const router = new Router({prefix: '/category'})

router.get('/crumbs', async (ctx) => {
  const { city } = ctx.query
  const { status, data: { areas, types }} = await axios.get(`http://cp-tools.cn/categroy/crumbs`,{
    params: {
      city,
      sign
    }
  })
  ctx.body = {
    areas: status === 200? areas : [],
    types: status === 200 ? types : []
  }
  
})
export default router
