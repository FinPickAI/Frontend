export type JobType = '학생' | '사회초년생' | '직장인' | '자영업자' | '구직자' | '프리랜서';
export type InvestmentPropensity = '안정' | '중립' | '공격';
export type TargetPeriod = 6 | 12 | 24 | 36;

export interface UserInputs {
  age: number;
  job: JobType;
  monthlyIncome: number;
  assets: number;
  monthlySavings: number;
  financialGoal: string;
  investmentPropensity: InvestmentPropensity;
  period: TargetPeriod;
  privacyAgreed: boolean;
}

export interface FinancialProduct {
  id: string;
  bankName: string;
  productName: string;
  type: 'deposit' | 'savings';
  period: number;
  interestRate: number;
  interestType: string; // '단리' | '복리' 등 (금리 방식)
  score: number;
  recommendReason: string;
}

export interface Benefit {
  id: string;
  name: string;
  description: string;
  minAge?: number;
  maxAge?: number;
  maxIncome?: number; // 연소득 기준
  targetJob?: JobType[];
  category: string;
  relevanceReason: string;
}

export interface RecommendationResult {
  products: FinancialProduct[];
  benefits: Benefit[];
  actionRecommendation: string;
}