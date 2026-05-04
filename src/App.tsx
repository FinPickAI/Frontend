import React, { useState } from 'react';
import Hero from './components/Hero';
import UserForm from './components/UserForm';
import Dashboard from './components/Dashboard';
import type { UserInputs, RecommendationResult } from './types';
import { getRecommendations } from './engine';
import { ShieldCheck, Info } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'form' | 'result'>('landing');
  const [userInputs, setUserInputs] = useState<UserInputs | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);

  const handleStart = () => setStep('form');

  const handleFormSubmit = (data: UserInputs) => {
    setUserInputs(data);
    const results = getRecommendations(data);
    setRecommendations(results);
    setStep('result');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setStep('landing');
    setUserInputs(null);
    setRecommendations(null);
  };

  return (
      <div className="min-h-screen flex flex-col font-heading bg-navy-900 text-slate-100 selection:bg-mint-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={handleReset}
          >
            <div className="w-8 h-8 bg-mint-500 rounded-lg flex items-center justify-center shadow-lg shadow-mint-500/20">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">FinPick</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {step === 'landing' && <Hero onStart={handleStart} />}
        {step === 'form' && <UserForm onSubmit={handleFormSubmit} />}
        {step === 'result' && recommendations && userInputs && (
          <Dashboard 
            user={userInputs} 
            result={recommendations} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-navy-300 py-12 border-t border-navy-800">
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
          <div className="border-t border-slate-800 pt-8 flex flex-col gap-4">
            <div className="flex items-start gap-3 bg-navy-900/50 p-5 rounded-2xl border border-navy-800">
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