// 引入Mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
// 声明Schema
const Schema = mongoose.Schema
// 声明Object类型
let ObjectId = Schema.Types.ObjectId
// 创建我们的用户Schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: {
    type: String,
    unique: true
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
},{collection:'user'})
//每次存储数据时都要执行
userSchema.pre('save', function(next){
  //let user = this
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt, (err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      }) 

  })
})
userSchema.methods = {
  // 密码对比的方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password,password, (err,isMatch) => {
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
mongoose.model('User', userSchema)