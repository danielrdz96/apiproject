import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsModalPage } from './tools-modal.page';

describe('ToolsModalPage', () => {
  let component: ToolsModalPage;
  let fixture: ComponentFixture<ToolsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
