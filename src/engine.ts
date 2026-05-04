import type { UserInputs, FinancialProduct, Benefit, RecommendationResult } from './types';
import { mockProducts, mockBenefits } from './mockData';

/**
 * 금융상품 추천 점수 계산
 * - 기간 일치 여부
 * - 안정형 -> 예금 우선
 * - 사회초년생 -> 청년 전용 상품 우선
 */
export const calculateProductScore = (product: FinancialProduct, user: UserInputs): number => {
  let score = 0;

  // 1. 기간 일치 (가중치 높음)
  if (product.period === user.period) {
    score += 50;
  } else if (Math.abs(product.period - user.period) <= 12) {
    score += 20;
  }

  // 2. 투자 성향
  if (user.investmentPropensity === '안정') {
    if (product.type === 'deposit') score += 30;
    else score += 10;
  } else if (user.investmentPropensity === '공격') {
    if (product.type === 'savings') score += 30;
  } else {
    score += 20;
  }

  // 3. 직업 및 타겟
  if (product.targetJob?.includes(user.job)) {
    score += 40;
  }

  // 4. 금리 가중치
  score += product.interestRate * 2;

  return score;
};

/**
 * 지원금 적합성 계산
 * - 연령대 확인
 * - 소득 기준 확인
 */
export const calculateBenefitScore = (benefit: any, user: UserInputs): number => {
  let score = 0;
  const annualIncome = user.monthlyIncome * 12;

  // 연령 체크
  if (benefit.minAge && user.age < benefit.minAge) return 0;
  if (benefit.maxAge && user.age > benefit.maxAge) return 0;
  score += 30;

  // 소득 체크
  if (benefit.maxIncome && annualIncome > benefit.maxIncome) return 0;
  score += 40;

  // 직업 매칭
  if (benefit.targetJob?.includes(user.job)) {
    score += 30;
  }

  return score;
};

/**
 * 실행 우선순위 제안 생성
 */
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

  return `소득의 ${Math.round((user.monthlySavings / user.monthlyIncome) * 100)}%를 저축하고 계시네요! "${topProduct.productName}"을 통해 목표 수익률을 높여보세요.`;
};

/**
 * 전체 추천 로직 통합
 */
export const getRecommendations = (user: UserInputs): RecommendationResult => {
  const productScores = mockProducts.map(p => ({
    productId: p.id,
    score: calculateProductScore(p, user)
  })).sort((a, b) => b.score - a.score);

  const topProductIds = productScores.slice(0, 3).map(ps => ps.productId);
  const recommendedProducts = mockProducts.filter(p => topProductIds.includes(p.id))
    .sort((a, b) => {
      const scoreA = productScores.find(ps => ps.productId === a.id)?.score || 0;
      const scoreB = productScores.find(ps => ps.productId === b.id)?.score || 0;
      return scoreB - scoreA;
    });

  const recommendedBenefits = mockBenefits
    .filter(b => calculateBenefitScore(b, user) > 0)
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
    scores: productScores
  };
};