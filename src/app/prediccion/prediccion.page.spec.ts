import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrediccionPage } from './prediccion.page';

describe('PrediccionPage', () => {
  let component: PrediccionPage;
  let fixture: ComponentFixture<PrediccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrediccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrediccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
