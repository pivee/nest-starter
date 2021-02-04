import { Exclude, Expose } from 'class-transformer';
import { IId } from 'src/interfaces/common.types';
import { IProduct } from 'src/interfaces/product.interface';

export class Product implements IProduct {
  id: IId;
  name: string;
  @Exclude()
  secret: string;
  @Exclude()
  productCode: string;

  constructor(
    id: IId,
    {
      name,
      secret,
      productCode,
    }: { name?: string; secret?: string; productCode?: string } = {},
  ) {
    this.id = id;
    this.name = name;
    this.secret = secret;
    this.productCode = productCode;
  }

  @Expose()
  get product_code(): string {
    return this.productCode.toUpperCase();
  }
}
