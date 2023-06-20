import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MydbDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.mydb') dataSource: MydbDataSource,
  ) {
    super(Product, dataSource);
  }
}
