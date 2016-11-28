import {ValidateField} from "./validate";
/*
* version 1.0.1
*/
export class Validator {
    formValid: boolean = true;

    validateFields: {[key:string] : ValidateField} = {};
    source: any;

    constructor(validateFields: {}, source: any) {
        this.validateFields = validateFields;
        this.source = source;
    }

    public validate() {
        this.setAllValid();
        this.checkRequired();

        return this.checkValid();
    }

    private setAllValid() {
        for(var fieldName in this.validateFields) {
            var field:ValidateField = this.validateFields[fieldName];
            field.isValid = true;
            // field.messageText = '';
        }
    }

    private checkRequired() {
        for(var fieldName in this.validateFields) {
            var field:ValidateField = this.validateFields[fieldName];
            if(field.isRequired) {
                var value = this.getValueByKey(fieldName);
                console.log('value', value);
                if(!value) {
                    field.isValid = false;
                    // field.messageText = (field.messageText ? field.messageText + '. ' : '') + 'This field is required';
                }
            }
        }
    }

    private getValueByKey(key: string): any {
        return this.source[key];
    }

    private checkValid() {
        this.formValid = true;
        for(var i in this.validateFields) {
            if(this.validateFields[i].isValid === false) {
                this.formValid = false;
                break;
            }
        }
        return this.formValid;
    }
}
