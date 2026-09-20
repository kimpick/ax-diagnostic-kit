# 개발 환경 세팅

> 이 문서는 **사람이 직접 해야 하는 작업**만 모은 체크리스트입니다.
> 코드 작성은 이 단계가 끝난 뒤에 이어집니다.

---

## 1. Node.js 설치 ⬅️ **현재 막혀 있는 지점**

이 PC에 Node.js가 설치되어 있지 않아 `npm`을 쓸 수 없습니다. Next.js 프로젝트 생성이 여기서 막힙니다.

- https://nodejs.org 에서 **LTS 버전** 설치 (설치 중 "Add to PATH" 옵션 유지)
- 설치 후 **터미널을 새로 열고** 확인:

```bash
node -v
npm -v
```

두 명령이 버전을 출력하면 완료입니다.

---

## 2. Supabase 프로젝트 생성

DB·인증·스토리지를 한 번에 씁니다.

1. https://supabase.com 에서 프로젝트 생성 (리전은 `Northeast Asia (Seoul)` 권장 — 응시자가 국내)
2. **Settings → API** 에서 아래 3개를 복사해 둡니다:
   - `Project URL`
   - `anon public` 키
   - `service_role` 키 ⚠️ *외부에 절대 노출 금지*
3. **Authentication → Providers → Google** 활성화
   - Google Cloud Console에서 OAuth 클라이언트를 만들어 Client ID/Secret을 여기에 입력
   - Supabase가 안내하는 **Redirect URL**을 Google Cloud Console의 "승인된 리디렉션 URI"에 등록
   - *이 값들은 Supabase 대시보드에만 넣으며, 우리 `.env`에는 들어가지 않습니다*

---

## 3. Gemini API 키

- https://aistudio.google.com/apikey 에서 발급
- 무료/저가 티어의 **분당 요청 한도(RPM)** 를 확인해 둘 것 — 30명이 동시에 실기 세션을 돌릴 때 병목이 될 수 있습니다

---

## 4. 환경변수 넣는 곳 — **세 군데가 각각 다릅니다**

가장 흔한 사고가 "GitHub에 넣었는데 앱이 못 읽는다"입니다. 용도가 완전히 다릅니다.

| 위치 | 언제 읽히나 | 지금 필요한가 |
|---|---|---|
| **`.env.local`** (레포 루트, git 제외) | **로컬 개발 서버 실행 시** | ✅ 필요 |
| **Vercel → Settings → Environment Variables** | **배포된 서비스 실행 시** | 배포 시점에 필요 |
| GitHub → Settings → Secrets | GitHub Actions(CI)에서만 | ❌ 지금은 불필요 |

### 할 일
1. `.env.example`을 복사해 `.env.local`을 만듭니다.
2. 위에서 받은 값들을 채웁니다.
3. `.env.local`이 **커밋되지 않는지** 확인합니다 (`.gitignore`에 이미 등록되어 있음).

```bash
cp .env.example .env.local
```

---

## 5. 배포 (나중에)

- Vercel에 이 GitHub 저장소를 연결
- 4번 표의 **Vercel 환경변수**에 같은 값을 다시 등록
- `NEXT_PUBLIC_APP_URL`은 배포 도메인으로 교체
- Supabase Auth의 Redirect URL에 배포 도메인도 추가

---

## 체크리스트

- [ ] Node.js LTS 설치 (`node -v` 확인)
- [ ] Supabase 프로젝트 생성 + API 키 3종 확보
- [ ] Supabase에서 Google OAuth Provider 활성화
- [ ] Gemini API 키 발급
- [ ] `.env.local` 작성
- [ ] (나중) Vercel 연결 + 환경변수 등록
