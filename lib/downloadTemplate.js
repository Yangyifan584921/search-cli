const download = require('download-git-repo')
class Down {
  constructor(tempName, path) {
    this.templateType = tempName
    this.path = path
    this.init()
  }
  async init() {
    download('direct:https://github.com/Yangyifan584921/search-pages', this.path, { clone: true }, err => {
      if(err) {
        console.log(err)
      } else {

      }
    })
  }
}
module.exports = Down