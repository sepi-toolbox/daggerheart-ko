# Daggerheart 한국어 번역 세션 핸드오프

## 프로젝트 개요

**목표**: psk05020/daggerheart-ru-ru (러시아어 번역본)을 한국어로 재번역해 Foundry VTT 모듈로 배포

**원본**: <https://github.com/psk05020/daggerheart-ru-ru>
**대상**: <https://github.com/sepi-toolbox/daggerheart-ko> (브랜치 `ko`)
**작업 폴더**: `01_TTRPG-Translation/daggerheart-ko/`
**번역 소스**: 러시아어 → 한국어 직접 번역 (원문 영어 미보유)

## 현재 상태 (2026-06-09)

### 완료 (11/15)
| # | 파일 | 크기 | 항목 |
|---|------|------|------|
| 1 | 모듈 셋업 | - | `daggerheart-ko` 폴더명/ID/lang `ko`, 새 저장소 생성, `ko` 브랜치 push |
| 2 | `daggerheart.armors.json` | 9KB | 방어구 35종 |
| 3 | `daggerheart.beastforms.json` | 15KB | 야수 형태 25 + 특성 27 |
| 4 | `daggerheart.consumables.json` | 19KB | 소모품 60종 |
| 5 | `daggerheart.communities.json` | 21KB | 공동체 9 + 특성 9 |
| 6 | `daggerheart.loot.json` | 23KB | 전리품 60종 |
| 7 | `daggerheart.ancestries.json` | 41KB | 혈통 18 + 특성 38 |
| 8 | `daggerheart.classes.json` | 42KB | 직업 9 + 직업특성 + 시작아이템 |
| 9 | `daggerheart.weapons.json` | 46KB | 무기 약 190종 |
| 10 | `daggerheart.subclasses.json` | 74KB | 하위직업 93종 (특성 75 + 컨셉 18) |
| 11 | `daggerheart.environments.json` | 140KB | 장소 19종 (각 환경 + 하위 특성 약 78개) |

### 남은 작업 (4/15)
| 파일 | 크기 | 비고 |
|------|------|------|
| `i18n/systems/daggerheart.json` | 163KB | 시스템 i18n (UI 라벨) |
| `daggerheart.journals.json` | 206KB | 저널 (룰북) — **청크 분할 필요** |
| `daggerheart.domains.json` | 352KB | 영역 카드 (주문/능력) — **청크 분할 필수** |
| `daggerheart.adversaries.json` | 406KB | 적대 존재 — **청크 분할 필수** |

## 작업 방식

1. `daggerheart-ko/translations/daggerheart.{이름}.json` 읽기 (Read)
2. 러시아어 → 한국어로 변환 (게임 용어집 일관성 유지)
3. JSON 유효성 검사: `python3 -m json.tool ... > /dev/null`
4. 커밋 + push (각 파일당 한 커밋 또는 2~3개 묶음)

**큰 파일(>100KB) 대응**: Read의 offset/limit으로 청크 단위 읽고, Edit으로 부분 수정 (Write로 전체 덮어쓰기 X).

## 게임 용어집 (일관성 핵심)

### 능력치
- Strength → 힘
- Agility → 민첩
- Finesse → 손재주
- Instinct → 본능
- Presence → 존재감
- Knowledge → 지식

### 핵심 자원
- Hope → 희망 / Hope Die → 희망 주사위
- Fear → 공포 / Fear Die → 공포 주사위
- Duality Dice → 양면 주사위
- Stress → 스트레스
- HP / Hit Points → HP
- Armor Slot → 방어구 슬롯
- Armor Score → 방어 점수
- Evasion → 회피
- Damage Threshold → 피해 한계치
- Proficiency → 숙련도

### 굴림 / 판정
- Action Roll → 행동 굴림
- Spellcast Roll → 주문 굴림
- Reaction Roll → 반응 굴림
- Advantage → 유리 / Disadvantage → 불리
- Critical → 결정타

### 거리 (RU 명칭 → KR)
- Melee (Рукопашная) → 근접 거리
- Very Close (Очень Близкое) → 매우 가까운 거리
- Close (Ближнее) → 가까운 거리
- Far (Дальнее) → 먼 거리
- Very Far (Очень Дальнее) → 매우 먼 거리

### 상태 / 효과
- Vulnerable (Уязвимый) → 취약
- Restrained (Скован) → 속박
- Hindered → 방해
- Cloaked (Замаскированный) → 은신
- Poisoned (Отравлен) → 중독

### 게임 시스템
- Domain (Домен) → 영역
- Vault (Хранилище) → 보관소
- Loadout (Снаряжение) → 장비
- Rank / Tier → 등급
- Short Rest / Long Rest → 짧은 휴식 / 긴 휴식
- Downtime → 휴식 시간
- Beastform → 야수 형태
- Rally (Вдохновение) → 격려
- Major / Severe → 큰 / 심각

### 직업 9종
| EN | KR | RU |
|----|----|----|
| Bard | 음유시인 | Бард |
| Druid | 드루이드 | Друид |
| Guardian | 수호자 | Страж |
| Ranger | 레인저 | Следопыт |
| Rogue | 도적 | Плут |
| Seraph | 세라핌 | Серафим |
| Sorcerer | 소서러 | Чародей |
| Warrior | 전사 | Воин |
| Wizard | 위저드 | Волшебник |

### 혈통 18종
| EN | KR |
|----|----|
| Clank | 클랭크 |
| Drakona | 드라코나 |
| Dwarf | 드워프 |
| Elf | 엘프 |
| Faerie | 페어리 |
| Faun | 폰 |
| Firbolg | 피르볼그 |
| Fungril | 펀그릴 |
| Galapa | 갈라파 |
| Giant | 거인 |
| Goblin | 고블린 |
| Halfling | 하플링 |
| Human | 인간 |
| Infernis | 인페르니스 |
| Katari | 카타리 |
| Orc | 오크 |
| Ribbet | 리벳 |
| Simiah | 시미아 |

### 공동체 9종
| EN | KR |
|----|----|
| Highborne | 귀족 출신 |
| Loreborne | 학자 출신 |
| Orderborne | 질서 출신 |
| Ridgeborne | 산악 출신 |
| Seaborne | 해양 출신 |
| Slyborne | 교활한 출신 |
| Underborne | 지하 출신 |
| Wanderborne | 방랑 출신 |
| Wildborne | 야생 출신 |

### 무기 특성 (자주 반복)
- Reliable (Надежный) → 정확함 — 공격 굴림 +1
- Heavy (Тяжелый) → 무거움 — 회피 -1
- Massive (Массивный) → 거대함 — 회피 -1 + 추가 피해 주사위
- Bulky (Громоздкий) → 거추장스러움 — 손재주 -1
- Quick (Быстрый) → 빠름 — 스트레스로 추가 대상
- Powerful (Мощный) → 강력함 — 추가 피해 주사위, 최저 버림
- Paired (В паре) → 페어 — 근접 피해 +N
- Returning → 회귀 — 던지면 손에 돌아옴
- Versatile (Универсальное) → 만능 — 대체 능력치
- Protective (Защитный) → 방호 — 등급을 방어 점수에
- Barrier (Барьер) → 장벽 — 방어 점수+1, 회피-1
- Brutal (Брутальный) → 잔혹 — 최댓값 시 추가 주사위
- Startling (Напугать) → 위협 — 대상이 스트레스
- Reload (Перезарядка) → 재장전 — d6에서 1 시 재장전 필요
- Grappling (Схватить) → 포획 — 근접으로 끌어당김

### 방어구 특성
- Flexible (Гибкая) → 유연함 — 회피 +1
- Very Heavy (Очень тяжелая) → 매우 무거움 — 회피-2, 민첩-1
- Fortified (Укрепленная) → 강화 — 슬롯당 심각도 2단계
- Resistant (Устойчивость) → 저항 — d6에서 6 시 슬롯 무소모

## 진행 명령어 (다음 세션 시작 시)

```bash
cd "/Users/sepi/Library/Mobile Documents/com~apple~CloudDocs/AIwork/01_TTRPG-Translation/daggerheart-ko"
git status              # 작업 트리 확인
git log --oneline       # 진행 상황 확인
git pull                # 원격 동기화
```

## 다음 작업: `i18n/systems/daggerheart.json` (163KB / 2559줄)

시스템 i18n (Babele 아님, UI 라벨). Foundry VTT 시스템 인터페이스 라벨이라 기존 게임 용어집과 100% 일치 필요. 키-값 구조이며 키는 영문, 값을 번역.

### 권장 작업 흐름
1. `python3 -c` 로 최상위 키 카테고리 목록 추출 (TYPES / CONTROLS / DAGGERHEART.* / ACTIVEEFFECT 등)
2. 카테고리별로 Read + Edit 청크 처리 (한 카테고리 ≈ 100~300줄)
3. 라벨 길이는 보통 1~10단어 → environments 같은 긴 문장 번역과는 결이 다름
4. 게임 용어집 (이 문서 하단 + classes/subclasses/environments 사용 용어) 일관성이 가장 중요
5. 매 청크 후 `python3 -m json.tool` 로 즉시 검증

### i18n 핵심 주의점
- 키(영문)는 절대 수정 X — 값(러시아어)만 한국어로
- `{변수명}` 자리표시자 그대로 보존 (예: `"+{step} за шаг"` → `"단계당 +{step}"`)
- Foundry 표준 라벨 (예: `Item`, `Actor`, `ActiveEffect`)은 한국어로 자연스럽게
- TYPES (Item/Actor types) 는 이미 ancestries/classes 등에서 쓰는 용어와 동일하게:
  - ancestry → 혈통, community → 공동체, class → 직업, subclass → 하위직업
  - feature → 특성, domainCard → 영역 카드, consumable → 소모품, loot → 전리품
  - weapon → 무기, armor → 방어구, beastform → 야수 형태
  - character → 캐릭터, companion → 동반자, adversary → 적, environment → 장소

### environments 번역 추가 용어 (계속 사용)
- Spotlight/Spotlighted (Подсвечивать) → 강조 / 강조됨
- Progress Countdown (Обратный Отсчет Прогресса) → 진행 카운트다운
- Consequence Countdown (Обратный отсчет последствий) → 결과 카운트다운
- Long-term Countdown (Долгосрочный Обратный Отсчет) → 장기 카운트다운
- Reaction Roll (Бросок Реакции) → 반응 굴림 (능력치+반응 굴림 형태)
- PC (ПИ) → PC (그대로)
- Fallen (Падшие) → 타락한 자들
- Higher Sanctuaries (Высшие Святилища) → 높은 성소
- Mortal Realm (Смертное Царство) → 유한자의 영역
- 적대존재 이름 (provisional, adversaries.json 작업 시 동기화 필요):
  - 어린 드라이어드, 숲 전사, 작은 나무지기, 작은 혼돈 정령
  - 왕국의 기사, 거대 독수리, 유리 뱀
  - 바깥 영역의 흉물/부패자/노예 (Outer Realms ...)
  - 상위 세라핌, 도검 호위병
  - 타락한 충격 부대
  - 부패한 좀비, 완성된 좄비, 좀비 군단
  - 삐죽한 칼날의 다리 꺾기/저격수, 꼭두각시, 부두목, 저주술사

### subclasses 번역 핵심 용어 (계속 사용)
- Channeling (Проводимость) → 발현
- Charged (Заряженный) → 충전됨
- Rally Die (Кость Сбора/Сплочения) → 격려 주사위
- Slayer Die (Кость Убийцы) → 학살자 주사위
- Prayer Die (Кубик Молитвы) → 기도 주사위
- Advantage Die (кубик преимущества) → 유리 주사위
- Mastery/Proficiency (Мастерство/Проницательность) → 숙련도 (둘 다 통일)
- Severity (тяжесть/серьезность) → 심각도
- Recall Cost (Стоимость Воспоминания) → 회상 비용
- Warden (Хранитель) → 지킴이 (Guardian=수호자와 구별)
- Wayfinder (Следопыт) → 길잡이 (Ranger=레인저와 구별)
- Troubadour → 트루바두르 (Bard=음유시인과 구별)
- 원소: 바람/대지/불/번개/물 (воздух/земля/огонь/молния/вода)

## 주의사항

- **Foundry lang code는 `ko`** (모듈 ID `daggerheart-ko`)
- 본 저장소는 **Babele 모듈 의존** (compendium 번역)
- `i18n/systems/daggerheart.json`은 시스템 UI 라벨 (Babele 아님)
- 번역 시 HTML 태그 `<p>`, `<strong>`, `<ul>` 등 **그대로 보존**
- `@Template[type:...]` 같은 Foundry 매크로 **수정 금지**
- 액션 ID (예: `MN2U7f7ypnQeg1PY`) **수정 금지**
- 고유명사: 인명(Bellamoi, Tyris, Veritas, Yorgi 등) 음역, 지명도 음역
