const Schema = require('../../../utils/Schema')
const {typeErrorMsg, requiredErrorMsg} = require('../../../utils/Error')
const {NAME, PASSWORD} = require('../../../utils/CommonProps')

const ERRORS = {
    NAME_TYPE: typeErrorMsg(NAME, "string"),
    PASSWORD_TYPE: typeErrorMsg(PASSWORD, "string"),
    NAME_REQUIRED: requiredErrorMsg(NAME),
    PASSWORD_REQUIRED: requiredErrorMsg(PASSWORD)
}

const loginSchema = new Schema()

loginSchema.addValidation(NAME,
    Schema.typeValidation("string"),
    ERRORS.NAME_TYPE
)
loginSchema.addValidation(NAME,
    Schema.requiredValidation(),
    ERRORS.NAME_REQUIRED
)
loginSchema.addValidation(PASSWORD,
    Schema.typeValidation("string"),
    ERRORS.PASSWORD_TYPE
    )
loginSchema.addValidation(PASSWORD,
    Schema.requiredValidation(),
    ERRORS.PASSWORD_REQUIRED
)

module.exports = loginSchema