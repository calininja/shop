import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: number;

    @ApiProperty({
        example: '/images/image.jpg',
        description: '이미지',
        required: true,
    })
    public src: string;

}