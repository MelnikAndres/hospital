const Schema = require('../../../utils/Schema')
const {typeErrorMsg, requiredErrorMsg} = require('../../../utils/Error')
const {APPO_ID, PATIENT_ID, INFO, MEDICINE} = require('../../../utils/CommonProps')

const ERRORS = {
    APPO_ID_TYPE: typeErrorMsg(APPO_ID, 'number'),
    PATIENT_ID_TYPE: typeErrorMsg(PATIENT_ID, 'number'),
    INFO_TYPE: typeErrorMsg(INFO, 'string'),
    MEDICINE_TYPE: typeErrorMsg(MEDICINE, 'string'),
    APPO_ID_REQUIRED: requiredErrorMsg(APPO_ID),
    PATIENT_ID_REQUIRED: requiredErrorMsg(PATIENT_ID),
    INFO_REQUIRED: requiredErrorMsg(INFO),
    MEDICINE_REQUIRED: requiredErrorMsg(MEDICINE)
}

const prescriptionSchema = new Schema()

prescriptionSchema.addValidation(APPO_ID,
    Schema.typeValidation('number'),
    ERRORS.APPO_ID_TYPE
)
prescriptionSchema.addValidation(APPO_ID,
    Schema.requiredValidation(),
    ERRORS.APPO_ID_REQUIRED
)
prescriptionSchema.addValidation(PATIENT_ID,
    Schema.typeValidation('number'),
    ERRORS.PATIENT_ID_TYPE
)
prescriptionSchema.addValidation(PATIENT_ID,
    Schema.requiredValidation(),
    ERRORS.PATIENT_ID_REQUIRED
)
prescriptionSchema.addValidation(INFO,
    Schema.typeValidation('string'),
    ERRORS.INFO_TYPE
)
prescriptionSchema.addValidation(INFO,
    Schema.requiredValidation(),
    ERRORS.INFO_REQUIRED
)
prescriptionSchema.addValidation(MEDICINE,
    Schema.typeValidation('string'),
    ERRORS.MEDICINE_TYPE
)
prescriptionSchema.addValidation(MEDICINE,
    Schema.requiredValidation(),
    ERRORS.MEDICINE_REQUIRED
)


module.exports = prescriptionSchema