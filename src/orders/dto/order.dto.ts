import { IsNumber } from 'class-validator';

export class SubmitOrderDto {
  @IsNumber()
  productId: number;
}
