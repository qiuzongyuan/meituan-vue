import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../db/models/province'
import sign from './utils/sign'
const router =new Router({prefix:'/geo'})
//线上接口
router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})
router.get('/menu',async (ctx) => {
  const {status, data:{ menu }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status == 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body ={
      menu: []
    }
  }
})
router.get('/province', async  (ctx) => {
  const{status, data:{province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province
    }
  } else {
    ctx.body = {
      province: []
    }
  }
})
router.get('/province/:id', async (ctx) => {
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})
router.get('/city', async (ctx) => {
  let { status, data: {city  } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})
router.get('/hotCity', async (ctx) => {
  const { status, data: { hots } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})
//链接本地mongodb

router.get('/province-db', async (ctx) => {
  const province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})
export default router
