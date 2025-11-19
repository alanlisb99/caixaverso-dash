import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { InvestmentService } from '../services/investment.service';
import { ProfileService } from '../services/profile.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const investmentServiceMock = {
    getInvestments: () => of([
      { product: 'CDB', type: 'CDB', balance: 1000 },
      { product: 'LCI', type: 'LCI', balance: 2000 },
    ]),
    getInvestmentHistory: () => of([
      { month: 'Jan', total: 1000 },
      { month: 'Fev', total: 3000 },
    ]),
  } as any;

  const profileServiceMock = {
    getRiskProfile: () => of({ level: 'Moderado' }),
    getRiskHistory: () => of([]),
    getRecommendedProducts: () => of([]),
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], 
      providers: [
        { provide: InvestmentService, useValue: investmentServiceMock },
        { provide: ProfileService, useValue: profileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve calcular totalBalance corretamente', () => {
    expect(component.totalBalance).toBe(3000);
  });


  it('deve limpar o resultado quando valor ou prazo forem inválidos', () => {
  // deixa um valor anterior “sujo”
  component.simResultadoBruto = 123 as any;
  component.simGanho = 50 as any;

  // força o if (!simValor || !simPrazoMeses)
  component.simValor = 0 as any;
  component.simPrazoMeses = 0 as any;

  component.calcularSimulacao();

  expect(component.simResultadoBruto).toBeNull();
  expect(component.simGanho).toBeNull();
});


  it('deve calcular simulação corretamente', () => {
    component.simValor = 1000;
    component.simPrazoMeses = 12;
    component.simTipo = 'CDB';

    component.calcularSimulacao();

    expect(component.simResultadoBruto).toBeGreaterThan(1000);
    expect(component.simGanho).toBeGreaterThan(0);
  });
});
