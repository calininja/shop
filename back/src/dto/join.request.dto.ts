import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
    @ApiProperty({
        example: 'admin',
        description: '아이디',
        required: true,
    })
    public signinId: string;

    @ApiProperty({
        example: 'qwerty123',
        description: '비밀번호',
        required: true,
    })
    public password: string;

    @ApiProperty({
        example: '경기도 수원시',
        description: '주소',
        required: true,
    })
    public address: string;
}