
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import {
  Investment,
  InvestmentHistoryPoint,
  InvestmentService,
} from '../services/investment.service';

import {
  ProfileService,
  RiskProfile,
  RiskHistoryPoint,
  RecommendedProduct,
} from '../services/profile.service';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  investments: Investment[] = [];
  investmentHistory: InvestmentHistoryPoint[] = [];
  riskProfile: RiskProfile | null = null;
  riskHistory: RiskHistoryPoint[] = [];
  recommendedProducts: RecommendedProduct[] = [];

  loading = false;
  error: string | null = null;


  simTipos = ['CDB', 'LCI', 'Tesouro Direto'];

  simValor = 10_000;
  simPrazoMeses = 12;
  simTipo: string = 'CDB';

  simResultadoBruto: number | null = null;
  simGanho: number | null = null;

 
  private readonly simTaxasAnuais: Record<string, number> = {
    CDB: 0.115,
    LCI: 0.10,
    'Tesouro Direto': 0.13,
  };


  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#005CA9', '#00ADEF', '#F39200', '#7CB5EC'],
      },
    ],
  };

 
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Saldo (R$)',
        backgroundColor: '#005CA9',
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };


  evolutionChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total investido (R$)',
        borderColor: '#00ADEF',
        fill: false,
        tension: 0.2,
      },
    ],
  };


  riskHistoryChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Score de risco',
        borderColor: '#F39200',
        fill: false,
        tension: 0.2,
      },
    ],
  };

  constructor(
    private readonly investmentService: InvestmentService,
    private readonly profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }


  private loadData(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      investments: this.investmentService.getInvestments(),
      investmentHistory: this.investmentService.getInvestmentHistory(),
      riskProfile: this.profileService.getRiskProfile(),
      riskHistory: this.profileService.getRiskHistory(),
      recommendedProducts: this.profileService.getRecommendedProducts(),
    }).subscribe({
      next: (result) => {
        this.investments = result.investments ?? [];
        this.investmentHistory = result.investmentHistory ?? [];
        this.riskProfile = result.riskProfile ?? null;
        this.riskHistory = result.riskHistory ?? [];
        this.recommendedProducts = result.recommendedProducts ?? [];

        this.updateCharts();
      },
      error: () => {
        this.error = 'Erro ao carregar dados.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }


  get totalBalance(): number {
    return this.investments.reduce((total, inv) => total + inv.balance, 0);
  }

  
  calcularSimulacao(): void {
    if (!this.simValor || !this.simPrazoMeses) {
      this.simResultadoBruto = null;
      this.simGanho = null;
      return;
    }

    const taxaAnual = this.simTaxasAnuais[this.simTipo] ?? 0.10;
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

    const montante = this.simValor * Math.pow(1 + taxaMensal, this.simPrazoMeses);

    this.simResultadoBruto = montante;
    this.simGanho = montante - this.simValor;
  }

 
  private updateCharts(): void {
    this.updatePieChart();
    this.updateBarChart();
    this.updateEvolutionChart();
    this.updateRiskHistoryChart();
  }

  private updatePieChart(): void {
    const byType = new Map<string, number>();

    for (const inv of this.investments) {
      const atual = byType.get(inv.type) ?? 0;
      byType.set(inv.type, atual + inv.balance);
    }

    this.pieChartData = {
      ...this.pieChartData,
      labels: Array.from(byType.keys()),
      datasets: [
        {
          ...this.pieChartData.datasets[0],
          data: Array.from(byType.values()),
        },
      ],
    };
  }

  private updateBarChart(): void {
    this.barChartData = {
      ...this.barChartData,
      labels: this.investments.map((inv) => inv.product),
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: this.investments.map((inv) => inv.balance),
        },
      ],
    };
  }

  private updateEvolutionChart(): void {
    this.evolutionChartData = {
      ...this.evolutionChartData,
      labels: this.investmentHistory.map((h) => h.month),
      datasets: [
        {
          ...this.evolutionChartData.datasets[0],
          data: this.investmentHistory.map((h) => h.total),
        },
      ],
    };
  }

  private updateRiskHistoryChart(): void {
    this.riskHistoryChartData = {
      ...this.riskHistoryChartData,
      labels: this.riskHistory.map((h) => h.month),
      datasets: [
        {
          ...this.riskHistoryChartData.datasets[0],
          data: this.riskHistory.map((h) => h.score),
        },
      ],
    };
  }

  onSimulate(product: RecommendedProduct): void {
    alert(
      [
        'Simulação de investimento:',
        '',
        `Produto: ${product.name}`,
        `Tipo: ${product.type}`,
        `Rentabilidade estimada: ${(product.profitability * 100).toFixed(2)}% a.a.`,
        `Perfil alvo: ${product.riskLevel}`,
      ].join('\n')
    );
  }
}
