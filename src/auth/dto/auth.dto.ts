import { IsUUID, IsString } from "class-validator";

export class RadioApiAuthDto {
    @IsUUID()
    api_key: string;

    @IsString()
    api_secret: string;
}

export class CreateApiRadioDto {
    @IsUUID()
    source_id: string;

    @IsString()
    description: string | null;
}

export class RadioApiDto {
    @IsUUID()
    api_key?: string;

    @IsString()
    api_secret?: string;

    @IsUUID()
    source_id?: string;

    @IsString()
    description?: string | null;
}