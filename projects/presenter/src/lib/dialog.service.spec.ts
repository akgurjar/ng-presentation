import { TestBed, inject } from '@angular/core/testing';

import { PrDialog } from './dialog.service';

describe('PrDialog', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PrDialog]
		});
	});

	it('should be created', inject([PrDialog], (service: PrDialog) => {
		expect(service).toBeTruthy();
	}));
});
