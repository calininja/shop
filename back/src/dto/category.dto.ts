import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: number;
    @ApiProperty({
        example: '의류',
        description: '카테고리',
        required: true,
    })
    public name: string;

}