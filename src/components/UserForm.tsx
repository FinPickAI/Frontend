import React, { useState } from 'react';
import type { UserInputs, JobType, InvestmentPropensity, TargetPeriod } from '../types';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: UserInputs) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserInputs>({
    age: 25,
    job: '사회초년생',
    monthlyIncome: 250,
    assets: 1000,
    monthlySavings: 100,
    financialGoal: '내 집 마련',
    investmentPropensity: '중립',
    period: 12,
    privacyAgreed: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.age <= 0 || formData.age > 100)
      newErrors.age = '나이는 1~100 사이로 입력해주세요.';
    if (formData.monthlyIncome < 0)
      newErrors.monthlyIncome = '소득은 0 이상이어야 합니다.';
    if (formData.assets < 0)
      newErrors.assets = '자산은 0 이상이어야 합니다.';
    if (formData.monthlySavings < 0)
      newErrors.monthlySavings = '저축액은 0 이상이어야 합니다.';
    if (formData.monthlySavings > formData.monthlyIncome && formData.monthlyIncome > 0)
      newErrors.monthlySavings = '저축액이 월 소득을 초과할 수 없습니다.';
    if (!formData.financialGoal.trim())
      newErrors.financialGoal = '목표를 입력해주세요.';
    if (!formData.privacyAgreed)
      newErrors.privacyAgreed = '개인정보 동의가 필요합니다.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">당신을 위한 맞춤 분석</h2>
        <p className="text-slate-500">정확한 추천을 위해 기본적인 정보를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-premium p-8 md:p-10 space-y-8">
        {/* 나이 + 직업 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-slate-700">나이</label>
            <input
              type="number"
              min={1}
              max={100}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none"
            />
            {errors.age && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-slate-700">직업</label>
            <select
              value={formData.job}
              onChange={(e) => setFormData({ ...formData, job: e.target.value as JobType })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 outline-none"
            >
              {['학생', '사회초년생', '직장인', '자영업자', '구직자', '프리랜서'].map(j => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 소득 + 자산 + 저축 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-slate-700">월 소득 (만원)</label>
            <input
              type="number"
              min={0}
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 outline-none"
            />
            {errors.monthlyIncome && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.monthlyIncome}</p>}
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-slate-700">자산 (만원)</label>
            <input
              type="number"
              min={0}
              value={formData.assets}
              onChange={(e) => setFormData({ ...formData, assets: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 outline-none"
            />
            {errors.assets && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.assets}</p>}
          </div>

          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-slate-700">월 저축 가능액 (만원)</label>
            <input
              type="number"
              min={0}
              value={formData.monthlySavings}
              onChange={(e) => setFormData({ ...formData, monthlySavings: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 outline-none"
            />
            {errors.monthlySavings && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.monthlySavings}</p>}
          </div>
        </div>

        {/* 금융 목표 + 투자 성향 + 희망 기간 */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block mb-3 text-sm font-semibold text-slate-700">금융 목표</label>
            <input
              type="text"
              placeholder="예: 1억 모으기, 주택청약 마련"
              value={formData.financialGoal}
              onChange={(e) => setFormData({ ...formData, financialGoal: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 outline-none"
            />
            {errors.financialGoal && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.financialGoal}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block mb-3 text-sm font-semibold text-slate-700">투자 성향</label>
              <div className="flex gap-2">
                {(['안정', '중립', '공격'] as InvestmentPropensity[]).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, investmentPropensity: p })}
                    className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.investmentPropensity === p
                        ? 'bg-navy-600 border-navy-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-navy-200'
                    }`}
                  >
                    {p === '안정' ? '안정추구' : p === '중립' ? '중립형' : '적극투자'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block mb-3 text-sm font-semibold text-slate-700">희망 기간</label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: Number(e.target.value) as TargetPeriod })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-navy-500 outline-none"
              >
                {[6, 12, 24, 36].map(p => (
                  <option key={p} value={p}>{p}개월</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 개인정보 동의 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyAgreed}
              onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-slate-300 text-navy-600 focus:ring-navy-500"
            />
            <div className="text-sm text-slate-600">
              <p className="font-semibold text-slate-900 mb-1">개인정보 수집 및 이용 동의 (필수)</p>
              <p className="leading-relaxed">맞춤형 금융 상품 및 지원금 추천을 위해 입력하신 정보를 수집합니다. 정보는 분석 후 저장되지 않으며 일회성으로 사용됩니다.</p>
            </div>
          </label>
          {errors.privacyAgreed && <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={12} />{errors.privacyAgreed}</p>}
        </div>

        <button type="submit" className="btn-secondary w-full text-lg py-4 flex items-center justify-center gap-2">
          <CheckCircle2 size={20} />
          추천 결과 확인하기
        </button>
      </form>
    </div>
  );
};

export default UserForm;