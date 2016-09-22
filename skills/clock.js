'use strict'

let Promise = require('bluebird')

/*
        _____
     _.'_____`._
   .'.-'  12 `-.`.
  /,' 11      1 `.\
 // 10      /   2 \\
;;         /       ::
|| 9  ----O      3 ||
::                 ;;
 \\ 8           4 //
  \`. 7       5 ,'/
   '.`-.__6__.-'.'
    ((-._____.-))
    _))       ((_
   '--'       '--'

*/

let clockSkill = {
  exec: function (images, cb) {
    let newImages = [
      images[2],
      images[0],
      images[3],
      images[1]
    ]
    return Promise.resolve(newImages).asCallback(cb)
  },
  getData: function () {
    return {
      message: 'this a clock'
    }
  }
}

module.exports = clockSkill
