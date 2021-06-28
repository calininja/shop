import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
// import { Carts } from 'src/entities/carts.entity';
// import { Carts_Products } from 'src/entities/carts_products.entity';
// import { Categories } from 'src/entities/categories.entity';
// import { Colors } from 'src/entities/colors.entity';
// import { Images } from 'src/entities/images.entity';
// import { Products } from 'src/entities/products.entity';
// import { Sizes } from 'src/entities/sizes.entity';
// import { Users } from './src/entities/users.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        __dirname + '/**/*.entity{.ts,.js}'
    ],
    migrations: [
        "dist/migration/**/*.js"
    ],
    // entities: [
    //     Users,
    //     Categories,
    //     Carts,
    //     Carts_Products,
    //     Products,
    //     Colors,
    //     Images,
    //     Sizes,
    // ],
    // migrations: [__dirname + '/src/migrations/*.ts'],
    // cli: { migrationsDir: 'src/migrations' },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    logging: true,
    keepConnectionAlive: true,
};

export = config;