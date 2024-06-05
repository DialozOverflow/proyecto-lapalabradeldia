import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugarPage } from './jugar.page';

describe('JugarPage', () => {
  let component: JugarPage;
  let fixture: ComponentFixture<JugarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
