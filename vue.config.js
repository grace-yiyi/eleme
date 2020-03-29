const webpack = require('webpack')
const appData = require('./data.json')
const goods = appData.goods
const seller = appData.seller
const ratings = appData.ratings

const path = require('path')

function resolve(dir) {
  return path.join(__dirname,dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer:{
    before(app){
      app.get('/api/seller',function(req,res){
        const id = req.query.id
        res.json({
          errno:0,
          data:Object.assign({},seller,{id})
        })
      })
      app.get('/api/goods',function(req,res){
        res.json({
          errno:0,
          data:goods
        })
      })
      app.get('/api/ratings',function(req,res){
        res.json({
          errno:0,
          data:ratings
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
        .set('components',resolve('src/components'))
        .set('common',resolve('src/common'))
        .set('api',resolve('src/api'))
        .set('utils',resolve('src/utils'))
  }
}
