import {Validator} from './validator';


describe('Validator class', () => {

    it('should return true after validation, if required field filled', () => {
        let validator: Validator;
        validator = new Validator(
            {
                hotel_id: {
                    isValid: true,
                    messageText: 'This field is required',
                    isRequired: true
                }
            },
            {hotel_id: '55'}
        );
        expect(validator.validate()).toEqual(true);
    });

    it('should return true after validation, if required field filled', () => {
        let validator: Validator;
        validator = new Validator(
            {
                hotel_id: {
                    isValid: true,
                    messageText: 'This field is required',
                    isRequired: true
                }
            },
            {hotel_id: ''}
        );
        expect(validator.validate()).toEqual(false);
    });

    it('should return true after validation, if required field filled', () => {
        let validator: Validator;
        validator = new Validator(
            {
                hotel_id: {
                    isValid: true,
                    messageText: 'This field is required',
                    isRequired: false
                }
            },
            {hotel_id: ''}
        );
        expect(validator.validate()).toEqual(true);
    });

    it('should return true after validation, if required field filled', () => {
        let validator: Validator;
        validator = new Validator(
            {
                hotel_id: {
                    isValid: true,
                    messageText: 'This field is required',
                    isRequired: false
                }
            },
            {hotel_id: '55'}
        );
        expect(validator.validate()).toEqual(true);
    })

});
