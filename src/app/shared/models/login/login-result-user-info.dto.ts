import { BaseDto } from '../base.dto';

export class LoginResultUserInfoDto extends BaseDto {
    Attributes: any[];
    SessionID: string;
    UserID: string;
    UserData: string;
}
