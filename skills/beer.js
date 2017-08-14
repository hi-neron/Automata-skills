'use strict'

let Promise = require('bluebird')

/*
                ~  ~
              (   ) )
            ( (   )  ) )
           ( (  )~~~~~~'
         ( ( )' ~~~~~~~'
           ( )|)       |-.
            O|   |  |   |-. \
            o|   |  |   |  \ \
           .|    |  |    |  | |
            |    |  |    |  / /
            |    |  |    |." "
             |          |- '
             |  ------  |
             .==========.
*/

let crabSkill = {
  exec: function (images, cb) {
    /*
    | ↑ | ↑ |
    | ↑ | ↑ | / like beer foam
    */
    let newImages = [
      images[2],
      images[3],
      images[0],
      images[1]
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
