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
  interestRate: number;
  period: number;
  type: 'deposit' | 'savings';
  targetJob?: JobType[];
  description: string;
  notice: string;
  tags: string[];
}

export interface Benefit {
  id: string;
  name: string;
  description: string;
  minAge?: number;
  maxAge?: number;
  maxIncome?: number; // 연소득 기준
  category: string;
  relevanceReason: string;
}

export interface RecommendationResult {
  products: FinancialProduct[];
  benefits: Benefit[];
  actionRecommendation: string;
  scores: { productId: string; score: number }[];
}