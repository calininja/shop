import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: string;

    @ApiProperty({
        example: '#000000',
        description: 'color',
        required: true,
    })
    public color: string;

    @ApiProperty({
        example: 'm',
        description: 'size',
        required: true,
    })
    public size: string;

    @ApiProperty({
        example: '1',
        description: 'quantity',
        required: true,
    })
    public quantity: string;

    @ApiProperty({
        example: '123',
        description: 'prdnumber',
        required: true,
    })
    public prdnumber: number;

}