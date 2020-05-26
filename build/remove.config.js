const fs = require('fs')
const path = require('path')
// 删除ts多余文件
function deleteFolder(path) {
  let files = [];
  if( fs.existsSync(path) ) {
      files = fs.readdirSync(path);
      files.forEach(function(file,index){
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) {
              deleteFolder(curPath);
          } else {
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
      console.log(`删除${path}文件夹成功`)
  }
}
deleteFolder(path.join(__dirname, '../dist/utils'))
fs.unlinkSync(path.join(__dirname, '../dist/ts-type.d.ts'))
