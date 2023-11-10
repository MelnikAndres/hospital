const Schema = require('../../../utils/Schema')
const {typeErrorMsg, lengthErrorMsg,invalidErrorMsg} = require('../../../utils/Error')
const {NAME, NEW_PASSWORD, ROLE} = require('../../../utils/CommonProps')
const ERRORS = {
    NAME_LENGTH: lengthErrorMsg(NAME, 3),
    PASSWORD_LENGTH: lengthErrorMsg(NEW_PASSWORD, 3),
    PASSWORD_TYPE: typeErrorMsg(NEW_PASSWORD, 'string'),
    NAME_TYPE: typeErrorMsg(NAME, 'string'),
    INVALID_ROLE: invalidErrorMsg(ROLE)
}
const createAdminUserSchema = new Schema()

createAdminUserSchema.addValidation(NAME,
    Schema.typeValidation('string'),
    ERRORS.NAME_TYPE
)
createAdminUserSchema.addValidation(NAME,
    Schema.minLengthValidation(3),
    ERRORS.NAME_LENGTH
)
createAdminUserSchema.addValidation(NEW_PASSWORD,
    Schema.typeValidation('string'),
    ERRORS.PASSWORD_TYPE
)
createAdminUserSchema.addValidation(NEW_PASSWORD,
    Schema.minLengthValidation(3),
    ERRORS.PASSWORD_LENGTH
)

createAdminUserSchema.addValidation(ROLE,
    Schema.requiredValueValidation('admin'),
    ERRORS.INVALID_ROLE
)

module.exports = createAdminUserSchema