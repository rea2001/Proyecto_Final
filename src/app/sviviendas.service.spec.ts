import { TestBed } from '@angular/core/testing';

import { SviviendasService } from './sviviendas.service';

describe('SviviendasService', () => {
  let service: SviviendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SviviendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
