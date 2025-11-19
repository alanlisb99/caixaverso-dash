
export interface Investment {
  id: number;
  name: string;
  type: string;
  riskLevel: 'baixo' | 'medio' | 'alto';
  minimumAmount: number;
}
