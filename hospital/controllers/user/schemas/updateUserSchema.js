const Schema = require('../../../utils/Schema')
const {typeErrorMsg, lengthErrorMsg} = require('../../../utils/Error')
const {NAME, NEW_PASSWORD} = require('../../../utils/CommonProps')
const ERRORS = {
    NAME_LENGTH: lengthErrorMsg(NAME, 3),
    PASSWORD_LENGTH: lengthErrorMsg(NEW_PASSWORD, 3),
    PASSWORD_TYPE: typeErrorMsg(NEW_PASSWORD, "string"),
    NAME_TYPE: typeErrorMsg(NAME, "string")
}
const updateUserSchema = new Schema()

updateUserSchema.addValidation(NAME,
    Schema.typeValidation("string"),
    ERRORS.NAME_TYPE
)
updateUserSchema.addValidation(NAME,
    Schema.minLengthValidation(3),
    ERRORS.NAME_LENGTH
)
updateUserSchema.addValidation(NEW_PASSWORD,
    Schema.typeValidation("string"),
    ERRORS.PASSWORD_TYPE
    )
updateUserSchema.addValidation(NEW_PASSWORD,
    Schema.minLengthValidation(3),
    ERRORS.PASSWORD_LENGTH
)


module.exports = updateUserSchema