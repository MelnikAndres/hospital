class Schema {
    validations = []

    addValidation(key, isValid, error, binding=false){
        this.validations.push({key, isValid, error, binding})
    }

    validate(toValidate){
        const errors = []
        for(const validation of this.validations){
            if(validation.binding) validation.isValid = validation.isValid.bind(toValidate)
            if(!validation.isValid(toValidate[validation.key])) errors.push(validation.error)
        }
        return errors.length ? errors : null
    }

    static typeValidation(type){
        return (value) => value === undefined || typeof value === type
    }

    static requiredValidation(){
        return (value) => !!value
    }
    
    static requiredValueValidation(requiredValue){
        return (value) => value === requiredValue
    }

    static minLengthValidation(minLength){
        return (value) => !value || value.length >= minLength
    }
    
}


module.exports = Schema