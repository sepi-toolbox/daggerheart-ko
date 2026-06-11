
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
        "Roll Save": "내성 굴림",
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
        "Spotlight Allies": "아군 강조",
        "Spotlight: Relentless": "강조: 끈질김",
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
        // ── 고유 연출 액션명 (팩별 1회성, 검수로 보강) ──
        "Fireball - Explosion": "화염구 - 폭발",
        "Become Unstoppable": "멈출 수 없게 되기",
        "Ghostly Form": "유령 형상",
        "Imbue": "주입",
        "Influence": "영향",
        "Summon Demon": "악마 소환",
        "Spotlight Demons": "악마 강조",
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
        }

    });

});
