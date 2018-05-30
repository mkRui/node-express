class user {
  static initPage (req, res) {
    res.send({
      code: 1,
      message: '',
      result: {
        userName: 'qzusers',
        id: 1
      }
    })
  }
}

module.exports = user