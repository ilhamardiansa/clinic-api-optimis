import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { format_json } from './env'; // Make sure the import path is correct

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new BadRequestException(
        format_json(400,false, formattedErrors, null, 'Validation failed', null),
      );
    }

    return value;
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map(err => ({
      property: err.property,
      messages: Object.values(err.constraints || {}),
      children: this.formatErrors(err.children || []),
    }));
  }
}
