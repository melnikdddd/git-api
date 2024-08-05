import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function Includes(
  entity: object,
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'Includes',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entity],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedEntity] = args.constraints;
          return Object.values(relatedEntity).includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid value`;
        },
      },
    });
  };
}
