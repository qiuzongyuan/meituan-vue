import Router from 'koa-router'
import axios from './utils/axios'
import sign from './utils/sign'
const router  = new Router({ prefix: '/search' })

router.get('/top', async (ctx) => {
  const {status, data:{top} } = await axios.get(`http://cp-tools.cn/search/top`,{params:{
    input: ctx.query.input,
    city: ctx.query.city,
    sign
    }})
  if (status === 200){
    ctx.body = {
      top
    }
  } else {
    ctx.body = {
      top: []
    }
  }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ?  ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace`,{
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query
  const {status,data:{count,pois }} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`,{
    params: {
      city,
      keyword,
      sign
    }})
  ctx.body = {
    count: status === 200 ? count : [],
    pois: status === 200 ? pois : []
  }
})
export default router
