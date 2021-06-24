const path = require('path')
const fsextra = require('fs-extra')
const fs = require('fs')
const Inquirer = require('inquirer')

const CreateTemplate = require('./downloadTemplate.js')
async function create(projectName, options) {
  console.log(projectName, options)
  const cwd = process.cwd()  // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName)  // 目标目录
  console.log('targetDir', targetDir)
  if(fsextra.existsSync(targetDir)) {
    if(options.force) {
      // 强制创建
      await fsextra.remove(targetDir)
      console.log('删除旧项目成功')
      createDir(projectName)
    } else {
      let { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancek', value: false }
          ]
        }
      ])
      if(!action) {
        console.log('取消操作')
        return
      } else if(action === 'overwrite') {
        await fsextra.remove(targetDir)
        console.log('删除旧项目成功')
        createDir(projectName, targetDir)
      }
    }
  } else {
    createDir(projectName, targetDir)
  }
}

function createDir(projectName, targetDir) {
  fs.mkdir(`./${projectName}`, async (err) => {
    if(err) {
      console.log('创建失败')
    } else {
      console.log('创建成功')
      let { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '下载模板类型:',
          choices: [
            { name: 'search-pages', value: 'search-pages' }
          ]
        }
      ])
      if(action) {
        new CreateTemplate(action, targetDir)
      }
    }
  })
}

module.exports = (...args) => {
  return create(...args)
}