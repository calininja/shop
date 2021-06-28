import { ApiProperty } from '@nestjs/swagger';

export class SizeDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: number;

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

}