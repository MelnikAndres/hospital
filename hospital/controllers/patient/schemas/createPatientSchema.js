const Schema = require('../../../utils/Schema')
const {typeErrorMsg, requiredErrorMsg, invalidErrorMsg} = require('../../../utils/Error')
const {EMAIL, PHONE, NAME, PASSWORD, ROLE} = require('../../../utils/CommonProps')

const ERRORS = {
    EMAIL_TYPE: typeErrorMsg(EMAIL, 'string'),
    PHONE_TYPE: typeErrorMsg(PHONE, 'string'),
    NAME_TYPE: typeErrorMsg(NAME, 'string'),
    PASSWORD_TYPE: typeErrorMsg(PASSWORD, 'string'),
    ROLE_TYPE: typeErrorMsg(ROLE, 'string'),
    NAME_REQUIRED: requiredErrorMsg(NAME),
    PASSWORD_REQUIRED: requiredErrorMsg(PASSWORD),
    ROLE_REQUIRED: requiredErrorMsg(ROLE),
    ROLE_INVALID: invalidErrorMsg(ROLE),
}
const createPatientSchema = new Schema()

createPatientSchema.addValidation(EMAIL,
    Schema.typeValidation('string'),
    ERRORS.EMAIL_TYPE
)
createPatientSchema.addValidation(PHONE,
    Schema.typeValidation('string'),
    ERRORS.PHONE_TYPE
)

createPatientSchema.addValidation(NAME,
    Schema.typeValidation('string'),
    ERRORS.NAME_TYPE
)
createPatientSchema.addValidation(NAME,
    Schema.requiredValidation(),
    ERRORS.NAME_REQUIRED
)
createPatientSchema.addValidation(PASSWORD,
    Schema.typeValidation('string'),
    ERRORS.PASSWORD_TYPE
)
createPatientSchema.addValidation(PASSWORD,
    Schema.requiredValidation(),
    ERRORS.PASSWORD_REQUIRED
)
createPatientSchema.addValidation(ROLE,
    Schema.typeValidation('string'),
    ERRORS.ROLE_TYPE
)
createPatientSchema.addValidation(ROLE,
    Schema.requiredValidation(),
    ERRORS.ROLE_REQUIRED
)
createPatientSchema.addValidation(ROLE,
    Schema.requiredValueValidation('patient'),
    ERRORS.ROLE_INVALID
)


module.exports = createPatientSchema