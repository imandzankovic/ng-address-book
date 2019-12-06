import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDiscardComponent } from './contact-discard.component';

describe('ContactDeleteComponent', () => {
  let component: ContactDiscardComponent;
  let fixture: ComponentFixture<ContactDiscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDiscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
