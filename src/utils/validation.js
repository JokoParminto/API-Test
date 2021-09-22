const validator = require('validator')
const cc_valid = require('card-validator')

const validate = async (data, res) => {
	const card_type = cc_valid.number(data.creditcard_type)
	const card_number = cc_valid.number(data.creditcard_number, {maxLength: 16})
	const card_cvv = cc_valid.cvv(data.creditcard_cvv)
	const card_expired = cc_valid.expirationDate(data.creditcard_expired)
	if (validator.isEmail(data.email) == false) {
		res.status(400).json({ status: 400, msg: 'Email invalid.'})
	} else if (card_type.isPotentiallyValid == false || card_number.isPotentiallyValid == false || card_cvv.isPotentiallyValid == false || card_expired.isPotentiallyValid == false) {
		res.status(400).json({ status: 400, msg: 'Credit card data invalid.'})
	} else {
		return true
	}
}

module.exports = {
	validate
}