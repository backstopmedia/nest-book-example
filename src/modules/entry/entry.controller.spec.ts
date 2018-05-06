import { Test } from '@nestjs/testing';
import { EntriesController } from './entry.controller';
import { EntriesService } from './entry.service';

describe('EntriesController', () => {
  let entriesController: EntriesController;
  let entriesSrv: EntriesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EntriesController]
    })
      .overrideComponent(EntriesService)
      .useValue({ findAll: () => null })
      .compile();

    entriesSrv = module.get<EntriesService>(EntriesService);
    entriesController = module.get<EntriesController>(EntriesController);
  });

  describe('findAll', () => {
    it('should return an array of entries', async () => {
      const result = [
        {
          uuid: '1234567abcdefg',
          title: 'Test title',
          body:
            'This is the test body and will serve to check whether the controller is properly doing its job or not.'
        }
      ];
      jest.spyOn(entriesSrv, 'findAll').mockImplementation(() => result);
      expect(Array.isArray(await entriesController.findAll())).toBe(true);
    });

    it('should return the entries retrieved from the service', async () => {
      const result = [
        {
          uuid: '1234567abcdefg',
          title: 'Test title',
          body:
            'This is the test body and will serve to check whether the controller is properly doing its job or not.'
        }
      ];
      jest.spyOn(entriesSrv, 'findAll').mockImplementation(() => result);

      expect(await entriesController.findAll()).toEqual(result);
    });
  });
});
