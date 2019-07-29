import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsModalPage } from './accounts-modal.page';

describe('AccountsModalPage', () => {
  let component: AccountsModalPage;
  let fixture: ComponentFixture<AccountsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
