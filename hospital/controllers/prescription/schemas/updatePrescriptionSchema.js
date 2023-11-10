const Schema = require('../../../utils/Schema')
const {typeErrorMsg} = require('../../../utils/Error')
const {INFO, MEDICINE} = require('../../../utils/CommonProps')
const ERRORS = {
    INFO_TYPE: typeErrorMsg(INFO, "string"),
    MEDICINE_TYPE: typeErrorMsg(MEDICINE, "string")
}
const updatePrescriptionSchema = new Schema()

updatePrescriptionSchema.addValidation(INFO,
    Schema.typeValidation("string"),
    ERRORS.INFO_TYPE
)
updatePrescriptionSchema.addValidation(MEDICINE,
    Schema.typeValidation("string"),
    ERRORS.MEDICINE_TYPE
)


module.exports = updatePrescriptionSchema