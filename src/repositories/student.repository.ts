import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Student, StudentRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Student.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Student, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
