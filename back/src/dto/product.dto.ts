import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: number;

    @ApiProperty({
        example: '제목1',
        description: '제목',
        required: true,
    })
    public title: string;

    @ApiProperty({
        example: '내용1',
        description: '내용',
        required: true,
    })
    public content: string;

    @ApiProperty({
        example: '고유번호',
        description: '고유번호',
        required: true,
    })
    public prdnumber: number;

    @ApiProperty({
        example: 'XL',
        description: '사이즈',
        required: true,
    })
    public size: string;

    @ApiProperty({
        example: 'red',
        description: '색상',
        required: true,
    })
    public color: string;

    @ApiProperty({
        example: '50000',
        description: '가격',
        required: true,
    })
    public price: number;

    @ApiProperty({
        example: 'image',
        description: '이미지',
        required: false,
    })
    public image: string;

    @ApiProperty({
        example: 'category',
        description: '카테고리',
        required: false,
    })
    public categoryId: string;

}