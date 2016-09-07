import { API } from 'config'

module.exports = function (api) {
  api.route(API.BASE_PATH + '/check')
    .get(function (req, res, next) {
      res.status(200).json({ success: true, message: 'Sal\'s' })
    })
}
