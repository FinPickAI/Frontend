import React from 'react';
import type { UserInputs, RecommendationResult, FinancialProduct, Benefit } from '../types';
import {
  Trophy,
  Target,
  TrendingUp,
  Lightbulb,
  ArrowRightCircle,
  Database,
  RefreshCcw,
  ShieldAlert
} from 'lucide-react';

interface DashboardProps {
  user: UserInputs;
  result: RecommendationResult;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, result, onReset }) => {
  const topScore = result.scores?.[0]?.score ?? 0;

  // 실제 점수 기반 분석 지표 계산
  const maxPossibleScore = 50 + 30 + 40 + 6 * 2; // 132점
  const goalFit = Math.min(Math.round((topScore / maxPossibleScore) * 100), 100);
  const riskLevel = user.investmentPropensity === '안정' ? 20 : user.investmentPropensity === '공격' ? 80 : 50;
  const joinability = result.products.length >= 3 ? 90 : result.products.length === 2 ? 70 : 50;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Dashboard Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="card-premium p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-navy-50 text-navy-600 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">분석 상품</p>
            <p className="text-xl font-bold text-navy-900">{result.products.length}건</p>
          </div>
        </div>
        <div className="card-premium p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-mint-50 text-mint-600 rounded-full flex items-center justify-center">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">가능 지원금</p>
            <p className="text-xl font-bold text-navy-900">{result.benefits.length}건</p>
          </div>
        </div>
        <div className="card-premium p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <Target size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">추천 점수</p>
            <p className="text-xl font-bold text-navy-900">{topScore}점</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="card-premium p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
            <RefreshCcw size={24} />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 font-medium">재분석하기</p>
            <p className="text-sm font-bold text-navy-900">정보 수정</p>
          </div>
        </button>
      </div>

      {/* Main Priority Card */}
      <div className="bg-navy-900 rounded-3xl p-8 md:p-10 text-white mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Lightbulb size={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint-500 text-white text-xs font-bold rounded-full mb-6">
            <ArrowRightCircle size={14} />
            오늘 가장 먼저 할 일
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
            {result.actionRecommendation}
          </h2>
          <p className="text-navy-200 max-w-2xl">
            {user.job} 신분과 {user.monthlyIncome}만원의 월 소득, {user.investmentPropensity}형 투자 성향을 분석한 결과입니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="text-white" />
                맞춤 금융상품 TOP 3
              </h3>
            </div>
            <div className="space-y-4">
              {result.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Trophy className="text-white" />
                놓치면 아쉬운 정부 지원금
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.benefits.length > 0 ? (
                result.benefits.map(benefit => (
                  <BenefitCard key={benefit.id} benefit={benefit} />
                ))
              ) : (
                <div className="col-span-2 p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400">
                  현재 조건에 해당하는 지원금이 없습니다.
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Database className="text-white" />
              시스템 분석 구조
            </h3>
            <SystemFlow />
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="sticky top-24">
            <section className="bg-white rounded-3xl p-6 border border-navy-100 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Lightbulb size={20} className="text-amber-500" />
                AI 추천 상세 분석
              </h3>
              <div className="space-y-4">
                <AnalysisMetric label="목표 적합성" score={goalFit} />
                <AnalysisMetric
                  label="위험 수준"
                  score={riskLevel}
                  color={riskLevel <= 30 ? 'bg-mint-500' : riskLevel >= 70 ? 'bg-rose-500' : 'bg-amber-400'}
                />
                <AnalysisMetric label="가입 가능성" score={joinability} />
                <AnalysisMetric label="실행 우선순위" score={100} />
              </div>
              <div className="mt-6 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 leading-relaxed">
                사용자의 <span className="text-navy-700 font-bold">{user.period}개월</span> 운용 계획에 맞춰 단기 유동성과 장기 수익성을 모두 고려한 포트폴리오입니다.
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <ShieldAlert size={100} />
              </div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldAlert size={20} className="text-rose-400" />
                금융 소비자 유의사항
              </h3>
              <ul className="text-sm space-y-3 text-slate-300">
                <li className="flex gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  개인정보는 분석 즉시 파기되며 어디에도 저장되지 않습니다.
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  특정 금융사에 편향되지 않은 객관적인 데이터(금융감독원 등)를 활용합니다.
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  원금 손실 가능성이 있는 상품은 가입 전 약관을 반드시 확인하십시오.
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                데이터 기준: 2026.05 · AI ETHICS CERTIFIED MVP
              </div>
            </section>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['금융감독원', '공공데이터포털', '복지로', '한국은행'].map(s => (
                <span key={s} className="px-2 py-1 bg-slate-100 text-slate-400 text-[10px] rounded uppercase font-bold">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: FinancialProduct & { recommendReason?: string } }> = ({ product }) => (
  <div className="card-premium p-6 flex flex-col md:flex-row gap-6 items-start">
    <div className="flex-shrink-0">
      <div className="w-16 h-16 bg-navy-50 rounded-2xl flex flex-col items-center justify-center text-navy-600">
        <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">{product.bankName}</span>
        <span className="text-lg font-black">{product.interestRate}<span className="text-xs">%</span></span>
      </div>
    </div>
    <div className="flex-grow">
      <div className="flex flex-wrap gap-2 mb-2">
        {product.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-mint-50 text-mint-700 text-[10px] font-bold rounded-full">#{tag}</span>
        ))}
      </div>
      <h4 className="text-lg font-bold text-navy-900 mb-1">{product.productName}</h4>
      <p className="text-sm text-slate-500 mb-3 leading-relaxed">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 p-3 rounded-xl">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">추천 이유</p>
          <p className="text-xs text-navy-700 font-medium">
            {product.recommendReason ?? '종합 조건 기반 추천'}
          </p>
        </div>
        <div className="bg-rose-50 p-3 rounded-xl">
          <p className="text-[10px] text-rose-400 font-bold uppercase mb-1">주의사항</p>
          <p className="text-xs text-rose-700 font-medium">{product.notice}</p>
        </div>
      </div>
    </div>
    <div className="flex-shrink-0 w-full md:w-auto">
      <button className="w-full md:w-auto px-6 py-3 bg-navy-900 text-white text-sm font-bold rounded-xl hover:bg-navy-800 transition-colors">
        상품 보러가기
      </button>
    </div>
  </div>
);

const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => (
  <div className="card-premium p-6 hover:border-mint-200 transition-colors">
    <div className="flex items-center gap-2 mb-4">
      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">{benefit.category}</span>
    </div>
    <h4 className="text-lg font-bold text-navy-900 mb-2">{benefit.name}</h4>
    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{benefit.description}</p>
    <div className="p-3 bg-mint-50 rounded-xl flex items-start gap-2">
      <Lightbulb size={14} className="text-mint-600 mt-0.5 flex-shrink-0" />
      <p className="text-xs text-mint-800 font-medium leading-relaxed">{benefit.relevanceReason}</p>
    </div>
  </div>
);

const AnalysisMetric: React.FC<{ label: string; score: number; color?: string }> = ({ label, score, color = 'bg-navy-600' }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs font-bold">
      <span className="text-slate-500">{label}</span>
      <span className="text-navy-900">{score}%</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

const SystemFlow: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
    <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
      <div className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wider">Step 1</div>
      <div className="text-sm font-bold text-slate-900">사용자 입력</div>
    </div>
    <div className="flex justify-center md:rotate-0 rotate-90 opacity-30 text-navy-200">
      <ArrowRightCircle size={24} />
    </div>
    <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
      <div className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wider">Step 2</div>
      <div className="text-sm font-bold text-slate-900">데이터 수집</div>
    </div>
    <div className="hidden md:flex justify-center opacity-30 text-navy-200">
      <ArrowRightCircle size={24} />
    </div>
    <div className="md:col-start-1 p-4 bg-navy-600 rounded-2xl text-center shadow-md md:mt-4">
      <div className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Step 3</div>
      <div className="text-sm font-bold text-white">AI 추천 엔진</div>
    </div>
    <div className="flex justify-center md:rotate-0 rotate-90 opacity-30 text-navy-200 md:mt-4">
      <ArrowRightCircle size={24} />
    </div>
    <div className="p-4 bg-mint-500 rounded-2xl text-center shadow-md md:mt-4">
      <div className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Step 4</div>
      <div className="text-sm font-bold text-white">맞춤 대시보드</div>
    </div>
  </div>
);

export default Dashboard;