# Claude Project Instructions

## Project Architecture

- 이 프로젝트는 Feature-Sliced Design(FSD) 구조를 따른다.
- 기능 단위 코드는 `features`에 배치한다.
- 재사용 가능한 UI 컴포넌트는 `shared/ui`에 배치한다.
- 비즈니스 엔티티 관련 코드는 `entities`에 배치한다.
- 화면 단위 조합 컴포넌트는 `views`에 배치한다.
- Next.js App Router의 라우팅 엔트리는 `app`에 둔다.
- 기존 Pages Router를 사용하지 않는 한 FSD 레이어명으로 `pages`는 사용하지 않는다.
- API 요청, 공통 유틸, 설정성 코드는 `shared`에 배치한다.
- Next.js App Router 환경에서는 서버 렌더링과 클라이언트 하이드레이션의 책임을 명확히 분리한다.

## Code Splitting Rules

- 하나의 파일은 가능하면 100줄 이하로 유지한다.
- 파일이 100줄을 넘을 경우, 다음 기준으로 분리한다.
  - UI 컴포넌트
  - 비즈니스 로직
  - 훅
  - 타입
  - 상수
  - 유틸 함수
- 단순히 줄 수를 줄이기 위한 무의미한 분리는 하지 않는다.
- 관심사가 2개 이상 섞이면 파일을 분리한다.

## Next.js / TypeScript Rules

- TypeScript에서 `any` 사용을 금지한다.
- 외부 입력, API 응답, 에러 객체처럼 타입이 불확실한 값은 `unknown`을 사용한 뒤 타입 가드로 좁힌다.
- 검증 없이 `unknown`을 강제 타입 단언하지 않는다.
- 컴포넌트 props 타입은 명시적으로 선언한다.
- UI 상태와 서버 상태를 구분한다.
- 서버 상태는 가능하면 React Query를 사용한다.
- 전역 클라이언트 상태는 필요한 경우에만 Zustand를 사용한다.
- Next.js App Router에서는 기본적으로 Server Component를 우선 사용한다.
- `use client`는 상호작용, 브라우저 API, 클라이언트 상태, React Query, Zustand가 필요한 컴포넌트에만 선언한다.
- 페이지 진입 시 필요한 초기 데이터는 가능하면 Server Component에서 가져온다.
- 클라이언트에서 다시 사용할 서버 데이터는 React Query의 `dehydrate` / `HydrationBoundary` 패턴을 사용한다.
- 서버에서 prefetch한 데이터와 클라이언트 React Query key는 반드시 동일하게 유지한다.
- 서버 데이터와 클라이언트 상태를 같은 컴포넌트에 과하게 섞지 않는다.
- Hydration mismatch를 방지하기 위해 렌더링 결과가 서버와 클라이언트에서 달라질 수 있는 코드는 Client Component로 분리한다.
- `window`, `document`, `localStorage`, `sessionStorage`, `navigator` 등 브라우저 전용 API는 Server Component에서 사용하지 않는다.
- 시간, 랜덤 값, 사용자 로컬 환경에 따라 달라지는 값은 서버 렌더링 결과와 클라이언트 렌더링 결과가 달라지지 않도록 주의한다.

## Hydration Rules

- 페이지 또는 화면의 데이터 prefetch는 가능한 한 서버 레이어에서 처리한다.
- React Query를 사용하는 화면은 Server Component prefetch와 HydrationBoundary 구조를 우선 고려한다.
- `QueryClient` 생성 로직은 `shared/lib/react-query`에 배치한다.
- query key, query function, query option은 가능하면 `entities` 또는 `features` 내부의 `api` 또는 `model` 레이어에 배치한다.
- 화면 컴포넌트는 직접 API 함수를 호출하지 않고 query option을 통해 데이터를 사용한다.
- Hydration이 필요한 데이터와 단순 클라이언트 전용 데이터는 분리한다.
- SEO, 초기 로딩 속도, 공유 가능한 페이지에 필요한 데이터는 Server Component에서 prefetch한다.
- 클릭 이후에만 필요한 데이터는 클라이언트에서 lazy query 또는 event 기반으로 요청한다.

## Component Rules

- 컴포넌트는 기본적으로 작고 명확하게 유지한다.
- 하나의 컴포넌트가 데이터 요청, 상태 관리, UI 렌더링을 모두 담당하지 않도록 한다.
- 복잡한 로직은 custom hook으로 분리한다.
- 스타일, 로직, 타입, API 요청을 한 파일에 과하게 몰아넣지 않는다.
- Server Component는 데이터 준비와 정적 UI 조합에 집중한다.
- Client Component는 사용자 상호작용, 클라이언트 상태, 브라우저 API 사용에 집중한다.
- Client Component의 범위는 최대한 작게 유지한다.
- 단순 레이아웃, 텍스트, 정적 UI는 Client Component로 만들지 않는다.

## React Query Rules

- query key는 배열 기반으로 선언한다.
- query key는 재사용 가능하도록 `entities/*/api` 또는 `entities/*/model`에 모아둔다.
- `useQuery`에서 inline query key와 inline query function을 반복 작성하지 않는다.
- 서버 prefetch와 클라이언트 useQuery는 같은 query option을 공유한다.
- mutation은 사용자 액션이 발생하는 Client Component 또는 feature hook에서 처리한다.
- 서버에서 prefetch할 필요가 없는 데이터는 HydrationBoundary에 포함하지 않는다.

## Zustand Rules

- Zustand는 전역 클라이언트 UI 상태가 필요한 경우에만 사용한다.
- 서버에서 가져온 데이터를 Zustand에 중복 저장하지 않는다.
- 모달, 토스트, 임시 선택값, 다단계 폼 상태처럼 클라이언트 전용 상태에 사용한다.
- React Query로 관리할 수 있는 서버 상태를 Zustand로 옮기지 않는다.

## File Placement Rules

- React Query 클라이언트 설정은 `shared/lib/react-query`에 둔다.
- 공통 API 클라이언트는 `shared/api`에 둔다.
- 엔티티별 query option은 `entities/{entity}/api` 또는 `entities/{entity}/model`에 둔다.
- 기능 단위 mutation, form hook, action hook은 `features/{feature}/model`에 둔다.
- 화면 조합 컴포넌트는 `views`에 둔다.
- 순수 UI 컴포넌트는 `shared/ui`에 둔다.

## Safety Rules

- 대규모 리팩토링은 한 번에 진행하지 않고 작은 단위의 변경으로 나누어 진행한다.
- 사용자의 명시적 요청 없이 public API, 라우트 경로, 데이터베이스 스키마를 변경하지 않는다.
- 기존 동작을 바꾸는 수정은 변경 이유와 영향 범위를 먼저 설명한다.
- 삭제가 필요한 경우 삭제 대상과 이유를 먼저 설명한다.

## Output Rules

- 코드를 수정하기 전에 변경 계획을 간단히 설명한다.
- 변경 후 어떤 파일을 왜 수정했는지 요약한다.
- 가능한 경우 lint, type-check, test 실행 방법을 함께 제안한다.
- Next.js App Router 관련 수정이 있는 경우 Server Component, Client Component, HydrationBoundary 적용 여부를 함께 설명한다.
- React Query를 수정한 경우 query key, prefetch, staleTime, hydration 여부를 함께 확인한다.
