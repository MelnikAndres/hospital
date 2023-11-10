const Schema = require('../../../utils/Schema')
const {typeErrorMsg} = require('../../../utils/Error')
const {EMAIL, PHONE} = require('../../../utils/CommonProps')
const ERRORS = {
    EMAIL_TYPE: typeErrorMsg(EMAIL, 'string'),
    PHONE_TYPE: typeErrorMsg(PHONE, 'string')
}
const updatePatientSchema = new Schema()

updatePatientSchema.addValidation(EMAIL,
    Schema.typeValidation('string'),
    ERRORS.EMAIL_TYPE
)
updatePatientSchema.addValidation(PHONE,
    Schema.typeValidation('string'),
    ERRORS.PHONE_TYPE
)

module.exports = updatePatientSchema