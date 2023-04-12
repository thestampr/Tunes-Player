import { TestBed } from '@angular/core/testing';

import { PlayerTestService } from './player-test.service';

describe('PlayerTestService', () => {
  let service: PlayerTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
