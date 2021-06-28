import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from './join.request.dto';

export class UserDto extends JoinRequestDto {
    @ApiProperty({
        example: 1,
        description: 'id',
        required: true,
    })
    public id: number;

}