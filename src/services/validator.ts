import {HttpErrors} from '@loopback/rest';
import validator from 'validator';
import {Credentioals} from '../repositories/users.repository';

export function isvalid(inputParam: Credentioals): boolean | never {
  if (!validator.isEmail(inputParam.name)) {
    throw new HttpErrors.UnprocessableEntity('Invalid Email');
  }
  if (!inputParam.password && inputParam.password.length < 5) {
    throw new HttpErrors.UnprocessableEntity('password length');
  }
  return true;

}
