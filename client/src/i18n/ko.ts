/**
 * 한국어 번역 - Claude Buddy Checker
 */

import type { en } from "./en";

export const ko: typeof en = {
  meta: {
    title: "Claude Buddy 확인기 - 터미널 펫 확인하기",
    description:
      "Claude Code Buddy 터미널 펫을 미리 확인하세요. UUID를 입력하면 고유한 동반자의 종, 희귀도, 스탯, ASCII 아트를 확인할 수 있습니다.",
  },
  hero: {
    h1: "당신의 Claude Code Buddy 확인하기",
    subtitle:
      "Claude Code에는 숨겨진 다마고치 스타일의 펫 시스템이 있습니다. 각 사용자는 계정 UUID를 기반으로 고유한 Buddy를 받게 됩니다. 아래에 UUID를 입력하여 출시 전에 당신의 동반자를 확인하세요.",
    imgAlt: "ASCII 펫 캐릭터를 표시하는 CRT 터미널",
  },
  privacy: {
    label: "보안",
    text: "모든 계산은 브라우저에서 로컬로 실행됩니다. UUID는 이 페이지를 벗어나지 않습니다. AccountUuid와 UserID는 자격 증명이 아니며 인증이나 사칭에 사용할 수 없습니다.",
  },
  input: {
    terminalTitle: "buddy_checker.sh",
    howToFind: "// UUID 찾는 방법:",
    option1Label: "방법 1:",
    option1Text: "Claude Code에 물어보기:",
    option1Code: "What is my accountUuid?",
    option2Label: "방법 2:",
    option2Text: "터미널에서 실행:",
    option2Code: "cat ~/.claude.json | grep accountUuid",
    placeholder: "acde070d-8c4c-4f0d-9d8a-162843c10333",
    buttonCheck: "BUDDY 확인",
    buttonScanning: "스캔 중...",
    errorEmpty: "오류: 입력이 없습니다. accountUuid 또는 userID를 입력하세요.",
    loading1: "$ FNV-1a로 UUID 해싱 중...",
    loading2: "$ Mulberry32 PRNG 시드 설정 중...",
    loading3: "$ 희귀도, 종, 스탯 롤링 중...",
  },
  result: {
    terminalTitle: "buddy_result.log",
    shinyBadge: "샤이니",
    attributes: "// 속성",
    labelSpecies: "종",
    labelRarity: "희귀도",
    labelEyes: "눈",
    labelHat: "모자",
    labelShiny: "샤이니",
    labelRarityPct: "희귀도 %",
    shinyYes: "예 ✦",
    shinyNo: "아니오",
    hatNone: "없음",
    stats: "// 스탯",
  },
  species: {
    title: "// 전체 18종",
    gridAlt: "레트로 터미널 스타일로 렌더링된 6종의 Claude Code Buddy 그리드",
  },
  rarity: {
    title: "// 희귀도 등급",
    colRarity: "희귀도",
    colChance: "확률",
    colStatFloor: "스탯 하한",
    colStars: "별",
    common: "일반",
    uncommon: "비범",
    rare: "희귀",
    epic: "에픽",
    legendary: "전설",
  },
  howItWorks: {
    title: "// 작동 원리",
    p1: 'Claude Code의 Buddy 시스템은 <strong>결정론적 알고리즘</strong>을 사용하여 펫을 생성합니다. <code>accountUuid</code>에 솔트(<code>friend-2026-401</code>)를 연결한 후 FNV-1a로 해싱하고 Mulberry32 PRNG에 입력합니다.',
    p2: "PRNG는 순차적으로 <strong>희귀도</strong>(가중 랜덤), <strong>종</strong>(18종 중 1), <strong>눈</strong>(6종 중 1), <strong>모자</strong>(일반 = 없음, 기타 = 8종 중 1), <strong>샤이니</strong>(1% 확률), <strong>5가지 스탯</strong>(피크 스탯과 덤프 스탯 포함)을 결정합니다.",
    p3: "알고리즘이 결정론적이므로 당신의 Buddy는 항상 동일합니다 — 공식 출시 전에 여기서 미리 확인할 수 있습니다.",
  },
  faq: {
    title: "// 자주 묻는 질문",
    items: [
      {
        q: "이것은 공식 도구인가요?",
        a: "아닙니다. 이 도구는 유출된 Claude Code 소스를 기반으로 커뮤니티에서 만든 것입니다. Buddy 시스템은 npm 패키지의 .map 파일에서 발견되었습니다.",
      },
      {
        q: "내 Buddy가 바뀌나요?",
        a: "아닙니다. 생성 과정은 결정론적입니다 — 같은 UUID는 항상 같은 Buddy를 생성합니다. 당신의 Buddy는 이미 결정되어 있습니다.",
      },
      {
        q: "샤이니 Buddy란 무엇인가요?",
        a: "샤이니는 1% 확률의 변형으로 Buddy에 반짝이는 효과를 추가합니다. 순수하게 장식적이지만 매우 희귀합니다.",
      },
      {
        q: "Buddy 시스템은 언제 출시되나요?",
        a: "유출된 소스 코드에 따르면 /buddy 명령은 2026년 4월 1일에 활성화될 예정입니다.",
      },
    ],
  },
  footer: {
    line1: "커뮤니티에서 제작. Anthropic과 무관합니다.",
    line2: "모든 계산은 로컬에서 수행됩니다. 데이터를 수집하거나 전송하지 않습니다.",
  },
};
