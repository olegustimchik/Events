import { GenericDto }                                                        from "@/core/abstracts/generic.dto";
import { Importance }                                                        from "@prisma/client";
import { Expose, Type }                                                      from "class-transformer";
import { IsString,  MinLength, IsDateString, IsEnum, IsUUID, Min, IsNumber } from "class-validator";

export class CreateEvent extends GenericDto {
  @Expose()
  @IsString()
  @MinLength(3)
  name: string;

  @Expose()
  @IsString()
  @MinLength(3)
  description: string;

  @Expose()
  @IsDateString()
  eventDate: string;

  @Expose()
  @IsString()
  @IsEnum(Importance)
  importance: Importance;
}

export class DeleteEvent extends GenericDto {
  @Expose()
  @IsUUID()
  id: string;
}

export class GetEvent extends GenericDto {
  @Expose()
  @IsUUID()
  id: string;
}

export class UpdateEvent extends GenericDto {
  @Expose()
  @IsString()
  @MinLength(3)
  name: string;

  @Expose()
  @IsString()
  @MinLength(3)
  description: string;

  @Expose()
  @IsDateString()
  eventDate: string;

  @Expose()
  @IsString()
  @IsEnum(Importance)
  importance: Importance;
}

export class GetEvents extends GenericDto {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  take: number;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  skip: number;
}
