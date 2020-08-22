import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async findAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.find();
        return products
    }

    async findProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException('This Product does not exist.');
        }
        return product
    }

    async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
        const product = await this.findProductById(id);

        await this.productRepository.update(product, { ...data });

        const productUpdated = this.productRepository.create({ ...product, ...data})

        return productUpdated;
    }

    async createProduct(data: CreateProductInput): Promise<Product> {
        const product = this.productRepository.create(data);
        const productSaved = await this.productRepository.save(product);

        if (!productSaved) {
            throw new InternalServerErrorException('Problem to create a product. Try again')
        }

        return productSaved;
    }

    async deleteProduct(id: string): Promise<boolean> {
        const product = await this.findProductById(id);

        const deleted = await this.productRepository.delete(product);
        
        if (deleted) {
            return true;
        }

        return false;
    }
}
