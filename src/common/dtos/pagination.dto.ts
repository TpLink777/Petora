
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {


    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number
}
