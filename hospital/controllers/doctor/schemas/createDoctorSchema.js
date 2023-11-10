const Schema = require('../../../utils/Schema')
const { typeErrorMsg, requiredErrorMsg, invalidErrorMsg } = require('../../../utils/Error')
const { SPECIALIZATION, NAME, PASSWORD, ROLE } = require('../../../utils/CommonProps')

const ERRORS = {
    SPECIALIZATION_TYPE: typeErrorMsg(SPECIALIZATION, 'string'),
    SPECIALIZATION_REQUIRED: requiredErrorMsg(SPECIALIZATION),
    NAME_TYPE: typeErrorMsg(NAME, 'string'),
    PASSWORD_TYPE: typeErrorMsg(PASSWORD, 'string'),
    NAME_REQUIRED: requiredErrorMsg(NAME),
    PASSWORD_REQUIRED: requiredErrorMsg(PASSWORD),
    ROLE_TYPE: typeErrorMsg(ROLE, 'string'),
    ROLE_REQUIRED: requiredErrorMsg(ROLE),
    ROLE_INVALID: invalidErrorMsg(ROLE),
}
const createDoctorSchema = new Schema()

createDoctorSchema.addValidation(SPECIALIZATION,
    Schema.typeValidation('string'),
    ERRORS.SPECIALIZATION_TYPE
)

createDoctorSchema.addValidation(SPECIALIZATION,
    Schema.requiredValidation(),
    ERRORS.SPECIALIZATION_REQUIRED
)

createDoctorSchema.addValidation(NAME,
    Schema.typeValidation('string'),
    ERRORS.NAME_TYPE
)
createDoctorSchema.addValidation(NAME,
    Schema.requiredValidation(),
    ERRORS.NAME_REQUIRED
)
createDoctorSchema.addValidation(PASSWORD,
    Schema.typeValidation('string'),
    ERRORS.PASSWORD_TYPE
)
createDoctorSchema.addValidation(PASSWORD,
    Schema.requiredValidation(),
    ERRORS.PASSWORD_REQUIRED
)
createDoctorSchema.addValidation(ROLE,
    Schema.typeValidation('string'),
    ERRORS.ROLE_TYPE
)
createDoctorSchema.addValidation(ROLE,
    Schema.requiredValidation(),
    ERRORS.ROLE_REQUIRED
)
createDoctorSchema.addValidation(ROLE,
    Schema.requiredValueValidation('doctor'),
    ERRORS.ROLE_INVALID
)


module.exports = createDoctorSchema
