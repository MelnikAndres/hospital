const Schema = require('../../../utils/Schema')
const {typeErrorMsg, requiredErrorMsg} = require('../../../utils/Error')
const {PATIENT_ID, SYMPTOMS, SPECIALIZATION} = require('../../../utils/CommonProps')

const ERRORS = {
    PATIENT_ID_TYPE: typeErrorMsg(PATIENT_ID, 'number'),
    SYMPTOMS_TYPE: typeErrorMsg(SYMPTOMS, 'string'),
    PATIENT_ID_REQUIRED: requiredErrorMsg(PATIENT_ID),
    SPECIALIZATION_TYPE: typeErrorMsg(SPECIALIZATION, 'string')
}

const createAppointmentSchema = new Schema()

createAppointmentSchema.addValidation(PATIENT_ID,
    Schema.typeValidation('number'),
    ERRORS.PATIENT_ID_TYPE
)

createAppointmentSchema.addValidation(SYMPTOMS,
    Schema.typeValidation('string'),
    ERRORS.SYMPTOMS_TYPE
)

createAppointmentSchema.addValidation(PATIENT_ID,
    Schema.requiredValidation(),
    ERRORS.PATIENT_ID_REQUIRED
)

createAppointmentSchema.addValidation(SPECIALIZATION,
    Schema.typeValidation('string'),
    ERRORS.SPECIALIZATION_TYPE
)

module.exports = createAppointmentSchema