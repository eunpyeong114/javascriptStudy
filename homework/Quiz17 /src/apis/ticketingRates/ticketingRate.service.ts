import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketingRate } from './entities/ticketingRate.entity';
import { ITicketingRateRegister } from './interfaces/ticketingRate.interface';

export class TicketingRateService {
  constructor(
    @InjectRepository(TicketingRate)
    private readonly ticketingRateRepository: Repository<TicketingRate>,
  ) {}
  register({ ticketingRate }: ITicketingRateRegister): Promise<TicketingRate> {
    return this.ticketingRateRepository.save({ ...ticketingRate });
  }
  update({ prevMovie, ticketingRate }): Promise<TicketingRate> {
    console.log(ticketingRate);
    return this.ticketingRateRepository.save({
      id: prevMovie.ticketingRate.id,
      ...ticketingRate,
    });
  }
}
