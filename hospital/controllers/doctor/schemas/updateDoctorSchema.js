const Schema = require('../../../utils/Schema')
const {typeErrorMsg, requiredErrorMsg} = require('../../../utils/Error')
const {SPECIALIZATION} = require('../../../utils/CommonProps')

const ERRORS = {
    SPECIALIZATION_TYPE: typeErrorMsg(SPECIALIZATION, "string"),
    SPECIALIZATION_REQUIRED: requiredErrorMsg(SPECIALIZATION)
}
const updateDoctorSchema = new Schema()

updateDoctorSchema.addValidation(SPECIALIZATION,
    Schema.typeValidation("string"),
    ERRORS.SPECIALIZATION_TYPE
)

updateDoctorSchema.addValidation(SPECIALIZATION,
    Schema.requiredValidation(),
    ERRORS.SPECIALIZATION_REQUIRED
)

module.exports = updateDoctorSchema
