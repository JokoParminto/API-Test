const user = require('../model/userModels')
const database = require('../database')
const common = require('../utils/common')

exports.update = async (req, res, next) => {
  const transaction = await database.transaction()
  try {
    const password = await common.generateBcrypt(req.body.password)
    let dataUpdate = {
      email : req.body.email,
      name : req.body.name,
      address : req.body.address,
      password : password,
      photos : JSON.stringify(req.body.photos),
      creditcard_type : req.body.creditcard_type,
      creditcard_name : req.body.creditcard_name,
      creditcard_number : req.body.creditcard_number,
      creditcard_expired : req.body.creditcard_expired,
      creditcard_cvv : req.body.creditcard_cvv
    }
    const update = await user.update(dataUpdate,
      {
        where: {
          user_id: req.body.user_id
        }
      }, {
        transaction
      }
    )
    await transaction.commit()
    if (update !== null) {
      code = 201
      success = true
    }
    res.status(201).json({
      status: 200,
      success: true
    })
  } catch (err) {
    await transaction.rollback()
    next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    let query = {}
    let sort = 'user_id'
    let dir = req.query.dir ? req.query.dir : 'ASC'
    let limit = parseInt(req.query ? (req.query.limit || 10) : 10)
    let pagenum = parseInt(req.query ? (req.query.pagenum || 1) : 1)
    let start = parseInt((pagenum - 1) * limit);
		const data = await user.findAndCountAll({
      where: query,
      offset: start,
      limit: limit,
      order: [[sort, dir]]
    })
    let pagination = await common.pagination(data.count, pagenum, limit)
    res.status(200).json({
      code: 200,
      rows: data.rows,
      pagination: pagination
    })
  } catch (err) {
    next(err)
  }
}

exports.detail = async (req, res, next) => {
  try {
		const data = await user.findOne({
      where: { 
        user_id: req.query.user_id
      } 
    })
    res.status(200).json({
      code: 200,
      rows: data.dataValues
    })
  } catch (err) {
    next(err)
  }
}
