import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Synth01Page } from './synth01.page';

describe('Synth01Page', () => {
  let component: Synth01Page;
  let fixture: ComponentFixture<Synth01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Synth01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Synth01Page);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 16 notes in 4x4 grid', () => {
    const totalNotes = component.notesArray.reduce((sum, row) => sum + row.length, 0);
    expect(totalNotes).toBe(16);
  });
});
