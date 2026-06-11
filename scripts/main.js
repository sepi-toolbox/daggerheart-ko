
Hooks.once('babele.init', (babele) => {

    babele.register({
        module: 'daggerheart-ko',
        lang: 'ko',
        dir: 'translations'
    });

    Babele.get().registerConverters({

        "toAdversariesItems": (origItems, transItems) => {
            for (const item of origItems) {
                const id = item._id;
                const t = transItems?.[id];
                if (!t) continue;
                if (t.name != null) item.name = t.name;
                if (t.description != null) item.system.description = t.description;

                // actions if exist — 액션별 번역(t.actions)이 있으면 적용, 없으면 기존 동작(아이템 설명 복사)으로 폴백
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
