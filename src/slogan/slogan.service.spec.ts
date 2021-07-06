import { Test, TestingModule } from '@nestjs/testing';
import { SloganService } from './slogan.service';

describe('SloganService', () => {
  let service: SloganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SloganService],
    }).compile();

    service = module.get<SloganService>(SloganService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
