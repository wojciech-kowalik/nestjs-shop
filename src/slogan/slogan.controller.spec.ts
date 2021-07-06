import { Test, TestingModule } from '@nestjs/testing';
import { SloganController } from './slogan.controller';

describe('SloganController', () => {
  let controller: SloganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SloganController],
    }).compile();

    controller = module.get<SloganController>(SloganController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
