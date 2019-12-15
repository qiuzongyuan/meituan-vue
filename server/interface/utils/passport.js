import passport from 'koa-passport'
import Local from'passport-local'
import userModel from '../../db/models/users'

passport.use(new Local(async function(username,password,done){
  let where = {
    username
  };
  let result = await userModel.findOne(where)
  if(result!=null){
    if(result.password===password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))

passport.serializeUser(function(user,done){
  done(null,user)
})

passport.deserializeUser(function(user,done){
  return done(null,user)
})
export default passport
