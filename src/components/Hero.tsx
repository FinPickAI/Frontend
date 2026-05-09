import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-navy-900 min-h-screen flex flex-col justify-center text-white">
      
      {/* Spline 3D Fullscreen Background - 200vw width to unify background color without any seams */}
      <div className="absolute top-0 bottom-0 z-0 overflow-visible pointer-events-auto w-[200vw] left-[-35vw] md:left-[-40vw] lg:left-[-40vw] xl:left-[-35vw] translate-x-[50px] opacity-30 lg:opacity-100">
        <iframe 
          src='https://my.spline.design/glasscreditcard-etVtvd6zzzDwIUjQG3fcyrxT/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full border-none outline-none scale-[0.8] lg:scale-[0.9] origin-center"
          title="3D Glass Credit Card Background"
        ></iframe>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 w-full relative z-20 flex flex-col items-start text-left mt-12 translate-x-[50px] pointer-events-none">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-sm font-bold mb-8 animate-fade-in-up shadow-xl pointer-events-auto">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint-500"></span>
          </span>
          AI 기반 개인 맞춤형 금융 큐레이션 엔진
        </div>
        
        {/* Main Headline */}
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.15] mb-8 font-heading animate-fade-in-up drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] tracking-tight" style={{ animationDelay: '0.1s' }}>
            흩어진 금융 정보,<br />
            이제 <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-200 to-mint-500">나에게 맞게</span>
          </h1>
          
          {/* Sub headline */}
          <p className="text-lg md:text-xl text-white/95 mb-12 leading-relaxed animate-fade-in-up font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]" style={{ animationDelay: '0.2s' }}>
            예·적금 상품, 투자 방향, 정부 지원금까지 한 번에 확인하세요.<br className="hidden md:block" />
            복잡한 조건 계산은 <strong className="font-semibold text-mint-300">FinPick AI</strong>가 대신합니다.
          </p>
          
          {/* Call to Action */}
          <div className="animate-fade-in-up w-full sm:w-auto pointer-events-auto flex flex-col items-start" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={onStart}
              className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-3 text-lg px-10 py-5 group rounded-full backdrop-blur-sm bg-mint-500/90 hover:bg-mint-500 shadow-[0_0_40px_rgba(45,212,191,0.4)]"
            >
              <span className="font-bold text-white">무료로 맞춤 추천받기</span>
              <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-white" />
              </div>
            </button>
            <p className="mt-6 text-sm text-white/80 flex items-center justify-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <ShieldCheck size={16} className="text-mint-400" />
              개인정보는 분석 직후 안전하게 파기됩니다.
            </p>
          </div>
        </div>

        {/* Mini Features */}
        <div className="flex flex-wrap justify-start gap-4 md:gap-6 mt-16 animate-fade-in-up pointer-events-auto" style={{ animationDelay: '0.4s' }}>
             <div className="flex items-center gap-2 text-sm md:text-base font-medium text-white drop-shadow-md bg-white/10 px-5 py-3 rounded-full backdrop-blur-md border border-white/20">
               <TrendingUp size={18} className="text-mint-300" />
               <span>정밀한 데이터 분석</span>
             </div>
             <div className="flex items-center gap-2 text-sm md:text-base font-medium text-white drop-shadow-md bg-white/10 px-5 py-3 rounded-full backdrop-blur-md border border-white/20">
               <Activity size={18} className="text-mint-300" />
               <span>실시간 금융 지표 연동</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
