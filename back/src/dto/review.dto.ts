import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: number;

    @ApiProperty({
        example: 'star',
        description: '별점',
        required: true,
    })
    public star: string;

    @ApiProperty({
        example: '코멘트',
        description: '리뷰 내용',
        required: true,
    })
    public comment: string;

    @ApiProperty({
        example: '92',
        description: '상품ID',
        required: true,
    })
    public prdId: string;

}