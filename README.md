# FinPick — 나만의 금융 큐레이션 서비스

FinPick은 사용자의 나이, 직업, 소득, 저축 목표, 투자성향을 바탕으로 예금·적금 상품과 정부지원금을 추천하는 개인 맞춤형 금융 큐레이션 서비스입니다.

단순히 최고 금리 상품을 나열하는 것이 아니라, 실제 금융감독원 데이터를 분석해 도출한 인사이트(가입기간별 금리 분포, 은행 유형별 금리 격차, 단리/복리 차이 등)를 추천 로직에 직접 반영합니다.

- **Backend**: [finpick-backend](https://github.com/FinPickAI/Backend)
- **Live Demo**: https://frontend-bngx.vercel.app

---

## Frontend

### 개요

사용자 정보를 입력받아 백엔드 `/recommend` API를 호출하고, 추천 상품·정부지원금·AI 분석 결과를 대시보드 형태로 시각화하는 React 애플리케이션입니다.

### 기술 스택

- React 19, TypeScript
- Vite
- Tailwind CSS

### 폴더 구조

```
finpick-frontend/
├── src/
│   ├── components/
│   │   ├── Hero.tsx        # 랜딩 화면
│   │   ├── UserForm.tsx    # 사용자 정보 입력 폼
│   │   └── Dashboard.tsx   # 추천 결과 대시보드
│   ├── App.tsx              # 라우팅 및 상태 관리, 백엔드 fetch
│   ├── types.ts             # 타입 정의 (백엔드 응답 구조와 일치)
│   └── main.tsx
└── .env.example              # 필요 환경변수 템플릿
```

### 실행 방법

```bash
npm install
cp .env.example .env   # VITE_API_URL 입력
npm run dev
```

### 환경변수

| 변수 | 설명 |
|---|---|
| `VITE_API_URL` | 백엔드 API 서버 주소 |

### 화면 흐름

1. **Hero** — 서비스 소개 및 시작하기
2. **UserForm** — 나이, 직업, 소득, 자산, 저축목표, 투자성향, 희망기간 입력
3. **Dashboard** — 추천 상품 TOP 3, 정부지원금, AI 추천 상세 분석(목표 적합성·위험 수준·가입 가능성) 표시
