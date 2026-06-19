
Hooks.once('babele.init', (babele) => {

    babele.register({
        module: 'daggerheart-ko',
        lang: 'ko',
        dir: 'translations'
    });

    // ── 표준 액션명 사전 ────────────────────────────────────────────────
    // 적대자/특성의 액션 버튼 라벨(system.actions[].name)은 컴펜디움 데이터에
    // 영문으로 박혀 있고 항목별 번역이 없으면 영문으로 노출된다.
    // "Attack", "Roll Save", "Gain Fear" 같은 표준 기계적 라벨을 영문명 기준으로 일괄 번역.
    // (고유 연출명 Wild Flame 등은 domains/classes의 항목별 번역에서 처리)
    const ACTION_NAME_MAP = {
        "Attack": "공격",
        "Roll Save": "대응 굴림",
        "Spellcast Roll": "주문시전 굴림",
        "Agility Roll": "민첩 굴림",
        "Cast": "시전",
        "Mark Stress": "스트레스 표시",
        "Mark a Stress": "스트레스 1 표시",
        "Mark HP": "HP 표시",
        "Mark Armor Slot": "방어 슬롯 표시",
        "Mark": "표시",
        "Target Marks Stress": "대상 스트레스 표시",
        "Take Stress": "스트레스 받기",
        "Spend Fear": "공포 소모",
        "Spend Hope": "희망 소모",
        "Spend a Hope": "희망 1 소모",
        "Spend Stress": "스트레스 소모",
        "Spend Token": "토큰 소모",
        "Spend Tokens": "토큰 소모",
        "Gain Fear": "공포 획득",
        "Gain Hope": "희망 획득",
        "Gain Bonus": "보너스 획득",
        "Gain Advantage": "이점 획득",
        "Give Token": "토큰 부여",
        "Lose Hope": "희망 상실",
        "Start Countdown": "카운트다운 시작",
        "Trigger Countdown": "카운트다운 발동",
        "Countdown": "카운트다운",
        "Damage": "피해",
        "Deal Damage": "피해 가하기",
        "Reduce Damage": "피해 감소",
        "Stress Damage": "스트레스 피해",
        "Damage Stress": "스트레스 피해",
        "Hope Damage": "희망 피해",
        "Damage Hope": "희망 피해",
        "Damage Armor": "방어구 피해",
        "Collision Damage": "충돌 피해",
        "Healing": "치유",
        "Heal": "치유",
        "Heal HP": "HP 치유",
        "Heal One Stress": "스트레스 1 치유",
        "Heal Two Stress": "스트레스 2 치유",
        "Heal Two Hit Points": "HP 2 치유",
        "Heal 1 Hit Point": "HP 1 치유",
        "Heal 2 Hit Points": "HP 2 치유",
        "Clear Stress": "스트레스 제거",
        "Clear HP": "HP 제거",
        "Clear Hit Point": "HP 제거",
        "Clear Stress & Gain Hope": "스트레스 제거 & 희망 획득",
        "Summon": "소환",
        "Summon Guards": "경비병 소환",
        "Summon Spirit": "정령 소환",
        "Transform": "변신",
        "Beastform": "야수 형태",
        "Use": "사용",
        "Use Feature": "특성 사용",
        "Activate": "발동",
        "Generic": "일반",
        "Critically Succeed": "치명적 성공",
        "Switch Duality Results": "이중성 결과 전환",
        "Block": "방어",
        "Avoid": "회피",
        "Interrupt": "방해",
        "Vanish": "소실",
        "Retreat": "후퇴",
        "Throw": "투척",
        "Rally": "격려",
        "Protect": "보호",
        "Halve Evasion": "회피 절반",
        "Become Dazed": "혼란 상태",
        "Spotlight Allies": "아군 주목",
        "Spotlight: Relentless": "주목: 집요함",
        "Fire": "불",
        "Earth": "대지",
        "Water": "물",
        "Air": "공기",
        "Roll d4": "d4 굴림",
        "Roll d6": "d6 굴림",
        "Roll d8": "d8 굴림",
        "Roll d10": "d10 굴림",
        "Roll d20": "d20 굴림",
        "Roll 2d4": "2d4 굴림",
        "Roll 2d10": "2d10 굴림",
        "Roll 1d12": "1d12 굴림",
        "Roll 2d12": "2d12 굴림",
        "Roll 3d12": "3d12 굴림",
        "Start Countdowns": "카운트다운 시작",
        "Lose Fear": "공포 상실",
        // ── 야수 형태(beastform) 기능 액션명 ──
        "Move": "이동",
        "Poison": "중독",
        "Restrain": "포박",
        "Retract": "움츠리기",
        "Cannonball": "포탄",
        "Ask Question": "질문하기",
        // ── 고유 연출 액션명 (팩별 1회성, 검수로 보강) ──
        "Fireball - Explosion": "화염구 - 폭발",
        "Become Unstoppable": "멈출 수 없게 되기",
        "Ghostly Form": "유령 형상",
        "Imbue": "주입",
        "Influence": "영향",
        "Summon Demon": "악마 소환",
        "Spotlight Demons": "악마 주목",
        "Splash": "끼얹기",
        "Acid Ground": "산성 지면",
        "Spit Attack": "뱉기 공격",
        "Glow": "발광",
        "Ignited Damage": "점화 피해",
        "Circle": "원",
        "Pull Tree": "나무 끌기",
        "Hidden attack": "은신 공격",
        "Bees!": "벌떼!",
        "Apply Venom": "독 적용",
        "Drop Bomb": "폭탄 투하",
        "Curse": "저주",
        "Deathlocked attack": "데스록 공격",
        "Make Guilty": "죄책감 부여"
    };

    // ── 야수 형태(beastform) 이점 스킬 사전 ────────────────────────────
    // beastform의 system.advantageOn = {<id>:{value:"Climb"}} 구조. value는 표준 스킬명
    // 14종이 반복되므로 영문 value 정확 일치 시 한국어로 일괄 치환(toAdvantageOn).
    const ADVANTAGE_MAP = {
        "Attack": "공격",
        "Climb": "등반",
        "Deceive": "기만",
        "Dig": "굴착",
        "Distract": "교란",
        "Leap": "도약",
        "Locate": "탐색",
        "Navigate": "길찾기",
        "Protect": "보호",
        "Scare": "위협",
        "Sneak": "잠입",
        "Sprint": "전력질주",
        "Swim": "수영",
        "Track": "추적"
    };

    // 액션 컬렉션의 name을 표준 사전으로 일괄 치환 (영문명 정확 일치 시에만).
    const applyActionNameMap = (actions) => {
        if (!actions) return;
        for (const aid in actions) {
            const a = actions[aid];
            if (a && a.name != null && ACTION_NAME_MAP[a.name] != null) {
                a.name = ACTION_NAME_MAP[a.name];
            }
        }
    };

    Babele.get().registerConverters({

        "toAdversariesItems": (origItems, transItems) => {
            for (const item of origItems) {
                const id = item._id;
                const t = transItems?.[id];

                // 1) 표준 액션명 사전을 항상 먼저 적용 (항목 번역 유무와 무관)
                applyActionNameMap(item.system?.actions);

                if (!t) continue;
                if (t.name != null) item.name = t.name;
                if (t.description != null) item.system.description = t.description;

                // 2) 항목별 액션 번역(t.actions)이 있으면 우선 적용, 없으면 기존 동작(아이템 설명 복사)으로 폴백
                const transActions = t.actions;
                for (const actionId in item.system.actions) {
                    const ta = transActions?.[actionId];
                    if (ta == null) {
                        if (t.description != null) item.system.actions[actionId].description = t.description;
                        continue;
                    }
                    if (typeof ta === "string") {
                        item.system.actions[actionId].description = ta;
                    } else {
                        if (ta.name != null) item.system.actions[actionId].name = ta.name;
                        if (ta.description != null) item.system.actions[actionId].description = ta.description;
                    }
                }

                // 3) 아이템에 박힌 활성 효과(item.effects) 번역. 런타임엔 풀 객체 배열.
                //    효과 _id 기준 name/description만 덮어쓰고 changes(기계 수정치)·duration 등은 보존.
                if (t.effects && Array.isArray(item.effects)) {
                    for (const eff of item.effects) {
                        const te = t.effects[eff._id];
                        if (te == null) continue;
                        if (typeof te === "string") { eff.name = te; continue; }
                        if (te.name != null) eff.name = te.name;
                        if (te.description != null) eff.description = te.description;
                    }
                }
            }
            return origItems;
        },
        "toActions": (origActions, transActions) => {
            // 표준 액션명 사전을 먼저 적용한 뒤, 항목별 번역으로 덮어쓴다.
            applyActionNameMap(origActions);
            if (!transActions) return origActions;
            for (const actionId in origActions) {
                const ta = transActions[actionId];
                if (ta == null) continue;
                if (typeof ta === "string") {
                    // 하위호환: 문자열이면 description 으로 취급
                    origActions[actionId].description = ta;
                } else {
                    if (ta.name != null) origActions[actionId].name = ta.name;
                    if (ta.description != null) origActions[actionId].description = ta.description;
                }
            }
            return origActions;
        },
        "toExperiences": (origExp, transExp) => {
            // 경험(system.experiences)은 {<id>:{name,description,value}} 구조.
            // 직접 매핑은 객체를 병합 못 해 번역이 안 먹으므로, ID 기준으로 name/description만
            // 덮어쓰고 value(수정치)는 보존한다.
            if (!transExp || typeof origExp !== "object") return origExp;
            for (const id in origExp) {
                const t = transExp[id];
                if (t == null) continue;
                if (typeof t === "string") {
                    origExp[id].name = t;
                } else {
                    if (t.name != null) origExp[id].name = t.name;
                    if (t.description != null) origExp[id].description = t.description;
                }
            }
            return origExp;
        },
        "toStringArray": (origArr, transArr) => {
            // 문자열 배열 필드(클래스의 system.backgroundQuestions / system.connections) 번역.
            // 직접 매핑은 배열을 병합 못 하므로, 인덱스 기준으로 번역 문자열이 있으면 덮어쓰고
            // 없으면 원문을 보존한다. 길이/순서는 원본 그대로 유지한다.
            if (!Array.isArray(origArr)) return origArr;
            if (!Array.isArray(transArr)) return origArr;
            return origArr.map((orig, i) => {
                const t = transArr[i];
                return (typeof t === "string" && t.length > 0) ? t : orig;
            });
        },
        "toEffects": (origEffects, transEffects) => {
            // 임베디드 활성 효과(effects 배열) 번역. 각 효과는 {_id, name, description, changes, ...} 구조.
            // Babele 기본 effects 매핑(document 컨버터)을 이 함수로 대체하고, 효과 _id 기준으로
            // name/description만 덮어쓰며 changes(기계 수정치)·duration 등 나머지 필드는 보존한다.
            // 번역에 없는 효과는 원문 보존(가드).
            if (!Array.isArray(origEffects) || !transEffects) return origEffects;
            for (const eff of origEffects) {
                const t = transEffects[eff._id];
                if (t == null) continue;
                if (typeof t === "string") { eff.name = t; continue; }
                if (t.name != null) eff.name = t.name;
                if (t.description != null) eff.description = t.description;
            }
            return origEffects;
        },
        "toAdvantageOn": (origAdv) => {
            // 야수 형태의 system.advantageOn = {<id>:{value:"Climb"}}. value를 표준 스킬
            // 사전(ADVANTAGE_MAP)으로 일괄 치환한다. 항목별 번역 데이터 없이 사전 기반으로만
            // 동작하므로 두 번째 인자(translation)는 사용하지 않는다.
            if (!origAdv || typeof origAdv !== "object") return origAdv;
            for (const id in origAdv) {
                const v = origAdv[id]?.value;
                if (v != null && ADVANTAGE_MAP[v] != null) origAdv[id].value = ADVANTAGE_MAP[v];
            }
            return origAdv;
        }

    });

});
