import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: any, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const password = (args.object as any)[relatedPropertyName];
      return confirmPassword === password;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'confirmPassword must match password';
    }
  }
  
  export function IsPasswordMatch(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [property],
        validator: IsPasswordMatchConstraint,
      });
    };
  }
  