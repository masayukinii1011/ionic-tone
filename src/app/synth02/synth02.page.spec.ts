import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Synth02Page } from './synth02.page';

describe('Synth02Page', () => {
  let component: Synth02Page;
  let fixture: ComponentFixture<Synth02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Synth02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Synth02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
