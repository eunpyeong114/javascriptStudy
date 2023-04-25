import { InputType, OmitType } from '@nestjs/graphql';
import { TicketingRate } from '../entities/ticketingRate.entity';

@InputType()
export class RegisterTicketingRateInput extends OmitType(
  TicketingRate,
  ['id'],
  InputType,
) {}
