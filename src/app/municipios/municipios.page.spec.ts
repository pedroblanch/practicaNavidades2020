import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MunicipiosPage } from './municipios.page';

describe('MunicipiosPage', () => {
  let component: MunicipiosPage;
  let fixture: ComponentFixture<MunicipiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MunicipiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
