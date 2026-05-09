import type { UserInputs, FinancialProduct, Benefit, RecommendationResult } from './types';
import { mockProducts, mockBenefits } from './mockData';

export const calculateProductScore = (product: FinancialProduct, user: UserInputs): number => {
  const youthOnlyIds = ['p1'];
  if (youthOnlyIds.includes(product.id) && user.age > 34) return 0;
  if (product.targetJob && !product.targetJob.includes(user.job)) return 0;

  let score = 0;

  if (product.period === user.period) {
    score += 50;
  } else if (Math.abs(product.period - user.period) <= 12) {
    score += 20;
  }

  if (user.investmentPropensity === '안정') {
    score += product.type === 'deposit' ? 30 : 10;
  } else if (user.investmentPropensity === '공격') {
    score += product.type === 'savings' ? 30 : 5;
  } else {
    score += 20;
  }

  if (product.targetJob?.includes(user.job)) score += 40;
  score += product.interestRate * 2;

  return score;
};

export const generateProductReason = (product: FinancialProduct, user: UserInputs): string => {
  const reasons: string[] = [];

  if (product.period === user.period) {
    reasons.push('희망 운용 기간과 상품 만기가 일치함');
  } else if (Math.abs(product.period - user.period) <= 12) {
    reasons.push('희망 운용 기간과 유사한 만기 조건');
  }

  if (user.investmentPropensity === '안정' && product.type === 'deposit') {
    reasons.push('안정형 투자 성향에 적합한 예금 상품');
  } else if (user.investmentPropensity === '공격' && product.type === 'savings') {
    reasons.push('공격형 투자 성향에 적합한 적금 상품');
  }

  if (product.targetJob?.includes(user.job)) {
    reasons.push(`${user.job} 대상 우대 조건 있음`);
  }

  if (product.interestRate >= 4) {
    reasons.push(`높은 금리 (${product.interestRate}%)`);
  }

  return reasons.length > 0 ? reasons.join(' · ') : '종합 조건 기반 추천';
};

export const calculateBenefitScore = (benefit: Benefit, user: UserInputs): number => {
  const annualIncome = user.monthlyIncome * 12 * 10000;
  let score = 0;

  if (benefit.minAge && user.age < benefit.minAge) return 0;
  if (benefit.maxAge && user.age > benefit.maxAge) return 0;
  score += 30;

  if (benefit.maxIncome && annualIncome > benefit.maxIncome) return 0;
  score += 40;

  if (benefit.targetJob?.includes(user.job)) {
    score += 30;
  }

  return score;
};

export const generateActionRecommendation = (
  topProduct: FinancialProduct,
  topBenefit: Benefit | undefined,
  user: UserInputs
): string => {
  if (topBenefit && topBenefit.name.includes('청년')) {
    return `"${topBenefit.name}" 신청 자격을 먼저 확인하고, "${topProduct.bankName} ${topProduct.productName}"으로 목돈 마련을 시작하세요.`;
  }

  if (user.investmentPropensity === '안정') {
    return `안정적인 자산 운용을 위해 "${topProduct.bankName} ${topProduct.productName}" 가입을 최우선으로 검토해보세요.`;
  }

  const savingsRate = user.monthlyIncome > 0
    ? Math.round((user.monthlySavings / user.monthlyIncome) * 100)
    : 0;

  if (savingsRate === 0) {
    return `"${topProduct.bankName} ${topProduct.productName}"으로 지금 당장 저축을 시작해보세요. 작은 금액도 괜찮습니다.`;
  }

  return `소득의 ${savingsRate}%를 저축하고 계시네요! "${topProduct.productName}"을 통해 목표 수익률을 높여보세요.`;
};

export const getRecommendations = (user: UserInputs): RecommendationResult => {
  const annualIncome = user.monthlyIncome * 12 * 10000;

  if (!mockProducts || mockProducts.length === 0) {
    return { products: [], benefits: [], actionRecommendation: '추천 가능한 상품이 없습니다.', scores: [] };
  }

  const productScores = mockProducts
    .map(p => ({ productId: p.id, score: calculateProductScore(p, user) }))
    .sort((a, b) => b.score - a.score);

  const topProductIds = productScores
    .filter(ps => ps.score > 0)
    .slice(0, 3)
    .map(ps => ps.productId);

  const recommendedProducts = mockProducts
    .filter(p => topProductIds.includes(p.id))
    .sort((a, b) => {
      const scoreA = productScores.find(ps => ps.productId === a.id)?.score ?? 0;
      const scoreB = productScores.find(ps => ps.productId === b.id)?.score ?? 0;
      return scoreB - scoreA;
    })
    .map(p => ({
      ...p,
      recommendReason: generateProductReason(p, user),
    }));

  const recommendedBenefits = mockBenefits
    .filter(b => {
      if (b.minAge && user.age < b.minAge) return false;
      if (b.maxAge && user.age > b.maxAge) return false;
      if (b.maxIncome && annualIncome > b.maxIncome) return false;
      if ((b as any).targetJob && !(b as any).targetJob.includes(user.job)) return false;
      return true;
    })
    .slice(0, 3);

  const actionRecommendation = generateActionRecommendation(
    recommendedProducts[0],
    recommendedBenefits[0],
    user
  );

  return {
    products: recommendedProducts,
    benefits: recommendedBenefits,
    actionRecommendation,
    scores: productScores,
  };
};