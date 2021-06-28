import { ApiProperty } from '@nestjs/swagger';

export class ColorDto {
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
        example: '#000000',
        description: '색상',
        required: true,
    })
    public color: string;

}