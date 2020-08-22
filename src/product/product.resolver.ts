import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private productService: ProductService
  ){}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    const products = await this.productService.findAllProducts();
    return products;
  }
  @Query(() => Product)
  async product(
      @Args('id') id: string
  ): Promise<Product> {
      const product = this.productService.findProductById(id);
      return product
  }

  @Mutation(() => Product)
  async createProduct(
      @Args('data') data: CreateProductInput
  ): Promise<Product> {
      const product = await this.productService.createProduct(data);
      return product;
  }

  @Mutation(() => Product)
  async updateProduct(
      @Args('id') id: string,
      @Args('data') data: UpdateProductInput
  ): Promise<Product> {
      const product = this.productService.updateProduct(id, data);
      return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
      @Args('id') id: string
  ): Promise<boolean> {
      const deleted = await this.productService.deleteProduct(id);
      return deleted;
  }
}
