const fs  = require('fs')
// fs.readFile('./goods.json', 'utf-8', function(err, data){
//   console.log(data);
//   let newData = JSON.parse(data)
//   let i = 0
//   let pushData = []
//   newData.RECORDS.map(function(value, index){
//     if(value.IMAGE1!=null){
//       i++
//       console.log(value.NAME)
//       pushData.push(value)
//     }
//   })
//     console.log(i)
//     console.log(pushData)
//     // fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
//     //   if(err) console.log('写文件操作失败');
//     //   else console.log('写文件操作成功');
//     // });
// })
fs.readFile('./newGoods.json','utf-8',function(err,data){
  // console.log(data);
  data = JSON.parse(data)
  console.log(data);
});