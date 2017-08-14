'use strict'

let Promise = require('bluebird')

/*
            _|
          _|
        _|
      _|
    _|
*/

let crabSkill = {
  exec: function (images, cb) {
    let newImages = [
      images[0],
      images[2],
      images[1],
      images[3]
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
