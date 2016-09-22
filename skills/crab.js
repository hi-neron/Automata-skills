'use strict'

let Promise = require('bluebird')

let crabSkill = {
  exec: function (images, cb) {
    let newImages = [
      images[1],
      images[0],
      images[3],
      images[2]
    ]
    return Promise.resolve(newImages).asCallback(cb)
  },
  getData: function () {
    return {
      message: 'this a crab skill'
    }
  }
}

module.exports = crabSkill
