@AGENTS.md

# ax-diagnostic-kit — 코드 저장소

AI 활용 역량(AX) 진단을 실행하는 플랫폼입니다. 핵심 주장: **"AI를 안다"가 아니라 "AI로 일할 수 있다"를 측정한다.**

## ⚠️ 먼저 알아야 할 것

**설계 문서는 이 저장소에 없습니다.** 별도의 비공개 워크스페이스에 있습니다.

| 경로 | 내용 |
|---|---|
| `D:\claude101\ax-diagnostic-kit\HANDOFF.md` | **프로젝트 전체 지도 — 여기부터 읽으세요** |
| `D:\claude101\ax-diagnostic-kit\design\01-플랫폼-구현계획.md` | 기능 명세·데이터 모델·기술 스택·보안 |
| `D:\claude101\ax-diagnostic-kit\design\02-빌드-슬라이스.md` | 구현 순서(S0~S6)와 현재 진행 상황 |

*(경로는 원 개발 환경 기준입니다. 다른 PC라면 `ax-diagnostic-kit` 폴더를 찾으세요.)*

**분리한 이유**: 이 저장소는 GitHub에 공개되어 있고, 워크스페이스에는 타사 기밀·저작물 분석이 들어 있어 물리적으로 떼어놨습니다. **워크스페이스의 `research/` 폴더 내용을 이 저장소로 복사하지 마세요.**

## 설계 원칙 (어기면 안 되는 것)

1. **문항은 데이터, 플랫폼은 런타임.** 문항·루브릭·시나리오는 버전이 찍힌 데이터이고, 런타임은 그것을 해석해 실행할 뿐입니다. 새 문항 유형을 추가하는 데 런타임 코드를 고쳐야 한다면 설계가 틀린 것입니다.
2. **응시 시점의 정의를 스냅샷으로 고정.** `attempt`는 자신이 사용한 `assessment_version`을 붙들고 있어야 합니다. 그래야 문항이 바뀌어도 과거 점수를 재현할 수 있습니다.
3. **채점은 재현 가능해야 한다.** 점수와 함께 모델명·프롬프트 버전·루브릭 버전·판정 회차별 원점수를 저장합니다.

## 기술 스택

- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Postgres + Auth(Google OAuth) + Storage)
- Google Gemini — 실기 챗봇은 Flash 계열(저비용·의도적 저성능), 채점은 Pro 계열
- Vercel 배포

**LLM 호출은 얇은 자체 어댑터로 감쌉니다** (LangChain 미사용). 런타임 전체가 아는 인터페이스는 두 개뿐입니다:
- `chatStream()` — 실기 세션 챗봇 (스트리밍 멀티턴)
- `completeJson()` — 채점 (구조화 JSON 출력)

**채점은 HTTP 요청-응답 경로에서 절대 호출하지 않습니다.** 제출은 `scoring_jobs`에 작업을 넣고 즉시 반환하고, 워커가 DB만 보고 처리합니다. 나중에 별도 서비스로 떼어낼 수 있도록 하기 위함입니다.

## 보안 (공개 저장소)

- `.env.local`에만 실제 키를 넣습니다. `.env.example`은 빈 템플릿입니다.
- `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`는 **절대 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.** 실기 챗봇은 반드시 서버 라우트를 경유해 프록시합니다.
- 객관식 정답을 클라이언트로 내려보내지 않습니다. 채점은 서버에서만 합니다.
- 문항·루브릭 실데이터는 커밋하지 않습니다 (`/content/private/`는 `.gitignore` 처리됨). 공개용 더미 시드만 커밋합니다.

## 개발 환경

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 빌드 검증
```

**Windows PATH 주의**: Node 설치 이후에 열지 않은 셸에서는 `npm`이 인식되지 않을 수 있습니다.
```powershell
$env:Path = "C:\Program Files\nodejs\;" + $env:Path
```

세팅 절차는 [SETUP.md](SETUP.md) 참고.
