import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TestMaskComponent } from './utils/test-component.component';
import { equal } from './utils/test-functions.component';
import { provideNgxMask } from '../lib/ngx-mask.providers';
import { NgxMaskDirective } from '../lib/ngx-mask.directive';

describe('Directive: Mask (Add suffix)', () => {
    let fixture: ComponentFixture<TestMaskComponent>;
    let component: TestMaskComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestMaskComponent],
            imports: [ReactiveFormsModule, NgxMaskDirective],
            providers: [provideNgxMask()],
        });
        fixture = TestBed.createComponent(TestMaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have a suffix', () => {
        component.mask = '00-000-000-00';
        component.suffix = '$';
        equal('6', '6$', fixture);
    });

    it('should have a suffix if first letter entered is y', () => {
        component.mask = 'L{80}';
        component.suffix = '.sh';
        equal('y', 'y.sh', fixture);
    });

    it('should have a suffix if the first character entered same as the last letter of the suffix', () => {
        component.mask = 'L{80}';
        component.suffix = '.sh';
        equal('h', 'h.sh', fixture);
    });
});
