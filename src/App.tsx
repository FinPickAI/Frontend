import React, { useState } from 'react';
import Hero from './components/Hero';
import UserForm from './components/UserForm';
import Dashboard from './components/Dashboard';
import type { UserInputs, RecommendationResult } from './types';
import { ShieldCheck, Info, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const App: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'form' | 'result'>('landing');
  const [userInputs, setUserInputs] = useState<UserInputs | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setStep('form');

  const handleFormSubmit = async (data: UserInputs) => {
    setUserInputs(data);
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
      const results = await res.json();
      setRecommendations(results);
      setStep('result');
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('landing');
    setUserInputs(null);
    setRecommendations(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-heading bg-navy-900 text-slate-100 selection:bg-mint-500/30">
      <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-8 h-8 bg-mint-500 rounded-lg flex items-center justify-center shadow-lg shadow-mint-500/20">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">FinPick</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {step === 'landing' && <Hero onStart={handleStart} />}

        {step === 'form' && (
          <>
            <UserForm onSubmit={handleFormSubmit} />

            {isLoading && (
              <div className="fixed inset-0 z-50 bg-navy-900/70 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
                  <Loader2 size={36} className="text-mint-500 animate-spin" />
                  <p className="text-navy-900 font-semibold">맞춤 상품 분석 중...</p>
                  <p className="text-slate-400 text-sm">잠시만 기다려주세요</p>
                </div>
              </div>
            )}

            {error && (
              <div className="max-w-3xl mx-auto px-4 pb-8">
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-5">
                  <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-semibold text-sm">추천 결과를 불러오지 못했습니다</p>
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-3 text-xs text-red-600 underline"
                    >
                      다시 시도하기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {step === 'result' && recommendations && userInputs && (
          <Dashboard
            user={userInputs}
            result={recommendations}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="bg-navy-900 text-navy-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">FinPick</h3>
              <p className="text-sm max-w-sm leading-relaxed">
                사용자의 금융 상황과 목표를 AI 알고리즘으로 분석하여<br />최적의 금융 상품과 정부 지원금을 큐레이션합니다.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={14} className="text-mint-400" />
                <span>AI 윤리 설계 프로젝트 MVP</span>
              </div>
              <p className="text-xs">© 2026 FinPick. 과제용 프로토타입으로 실제 서비스가 아닙니다.</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8">
            <div className="flex items-start gap-3 bg-navy-900/50 p-5 rounded-2xl border border-white/5">
              <Info size={18} className="text-mint-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                <span className="text-white font-semibold">법적 고지:</span> 본 서비스는 참고용 정보이며, 최종 금융 의사결정은 사용자 본인의 책임입니다. 제공되는 금리 및 조건은 실제와 다를 수 있으므로 해당 금융사의 최신 공시를 반드시 확인하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;