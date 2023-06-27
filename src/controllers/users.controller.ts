// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {isvalid} from '../services/validator';

// import {inject} from '@loopback/core';


export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository
  ) { }

  @post('/signup')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    isvalid({name: users.name, password: users.password});
    return await this.usersRepository.create(users);
  }

}
