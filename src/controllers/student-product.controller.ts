import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Student,
  Product,
} from '../models';
import {StudentRepository} from '../repositories';

export class StudentProductController {
  constructor(
    @repository(StudentRepository) protected studentRepository: StudentRepository,
  ) { }

  @get('/students/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Student has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.studentRepository.products(id).find(filter);
  }

  @post('/students/{id}/products', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Student.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInStudent',
            exclude: ['id'],
            optional: ['studentId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.studentRepository.products(id).create(product);
  }

  @patch('/students/{id}/products', {
    responses: {
      '200': {
        description: 'Student.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.studentRepository.products(id).patch(product, where);
  }

  @del('/students/{id}/products', {
    responses: {
      '200': {
        description: 'Student.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.studentRepository.products(id).delete(where);
  }
}
