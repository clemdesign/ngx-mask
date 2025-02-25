import { TestBed } from '@angular/core/testing';
import { IConfig } from '../lib/ngx-mask.config';
import { provideNgxMask } from '../lib/ngx-mask.providers';
import { NgxMaskPipe } from '../lib/ngx-mask.pipe';
import { NgxMaskApplierService } from 'ngx-mask';

describe('Pipe: Mask', () => {
    let maskPipe: NgxMaskPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxMaskPipe],
            providers: [provideNgxMask()],
        });
        const service: NgxMaskApplierService =
            TestBed.inject<NgxMaskApplierService>(NgxMaskApplierService);
        maskPipe = new NgxMaskPipe(service);
    });

    it('should mask a string', () => {
        const maskedString: string = maskPipe.transform('abcdef', 'SS-SS-SS');

        expect(maskedString).toEqual('ab-cd-ef');
    });

    it('should mask a number', () => {
        const maskedNumber: string = maskPipe.transform(123456789, '999-999-999');

        expect(maskedNumber).toEqual('123-456-789');
    });

    it('should mask a number and string', () => {
        const maskedNumberAndString: string | number = maskPipe.transform('123abc', '09A/SAS');
        expect(maskedNumberAndString).toEqual('123/abc');
    });

    it('should custom pattern', () => {
        const patttern: IConfig['patterns'] = {
            P: {
                pattern: new RegExp('\\d'),
            },
        };
        const maskedNumber: string = maskPipe.transform(123456789, ['PPP-PP-PPP', patttern]);
        expect(maskedNumber).toEqual('123-45-678');
    });

    it('should mask a zero number', () => {
        const maskedNumberAndString: string | number = maskPipe.transform(0, '0');
        expect(maskedNumberAndString).toEqual('0');
    });

    it('should mask separator', () => {
        const value: string | number = maskPipe.transform('123123123', 'separator.0');
        expect(value).toEqual('123 123 123');
    });

    it('should mask separator with thousandSeparator .', () => {
        const value: string | number = maskPipe.transform('123123123', 'separator.0', '.');
        expect(value).toEqual('123.123.123');
    });

    it('should mask separator with thousandSeparator ,', () => {
        const value: string | number = maskPipe.transform('123123123', 'separator.0', ',');
        expect(value).toEqual('123,123,123');
    });

    it('should mask separator.2 with thousandSeparator ,', () => {
        const value: string | number = maskPipe.transform('12312312.3', 'separator.2', ',');
        expect(value).toEqual('12,312,312.3');
    });
});
