# FinPick - AI 개인 맞춤 금융 큐레이션 MVP

FinPick은 사용자의 나이, 소득, 자산, 금융 목표, 투자 성향을 분석하여 최적의 금융 상품과 정부 지원금을 큐레이션해주는 AI 기반 금융 서비스 프로토타입입니다.

## 🚀 주요 기능
- **개인 맞춤형 추천**: 8가지 사용자 데이터를 기반으로 한 규칙 기반 점수 시스템
- **통합 대시보드**: 금융 상품(예/적금)과 정부 지원금을 한눈에 확인
- **행동 제안**: 분석 결과를 바탕으로 "오늘 가장 먼저 할 일" 제시
- **AI 윤리 설계**: 개인정보 보호, 추천 투명성, 손실 가능성 안내 등 법적/윤리적 가이드라인 준수

## 🛠 기술 스택
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **State Management**: React Hooks (useState)
- **Deployment Ready**: 정적 호스팅 지원

## 📦 설치 및 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 로컬 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드 (배포용)
```bash
npm run build
```

## 📂 파일 구조
- `src/types/`: TypeScript 인터페이스 정의
- `src/data/`: 금융 상품 및 지원금 Mock 데이터
- `src/utils/`: 추천 알고리즘 로직 (`engine.ts`)
- `src/components/`: 기능별 UI 컴포넌트
- `src/App.tsx`: 메인 화면 전환 및 상태 관리

## ⚖️ 안내 사항
본 서비스는 과제용 MVP 프로토타입입니다.
- **데이터 출처**: 금융감독원, 공공데이터포털, 복지로, 한국은행 ECOS 등 (Mock 데이터로 구현됨)
- **법적 고지**: 본 서비스는 참고용 정보이며, 최종 금융 의사결정은 사용자 본인의 책임입니다.