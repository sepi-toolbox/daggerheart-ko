
Hooks.once('babele.init', (babele) => {

    babele.register({
        module: 'daggerheart-ko',
        lang: 'ko',
        dir: 'translations'
    });

    Babele.get().registerConverters({

        "toAdversariesItems": (origItems, transItems) => {
            for (item of origItems) {
								id = item._id;
								if (id in transItems){
									item.name = transItems[id]?.name;
									item.system.description = transItems[id]?.description;
									
									// actions if exist
									for (actionId in item.system.actions){
										item.system.actions[actionId].description = transItems[id]?.description;
									}
								}
            }
            return;
        },
				"toActions": (origActions, transActions) => {
            for (actionId in origActions) {
								origActions[actionId]["description"] = transActions[actionId];
            }
            return;
        }
				
    });

});
