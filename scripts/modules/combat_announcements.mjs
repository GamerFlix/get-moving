export class combatAnnouncements{
    static getCombatants(combat, changes){  
        // no change in turns (this check needed for when adding combatants mid-combat).
        if(changes.turn === undefined) return;
        
        // combat not started.
        if(!combat.started) return;
        
        // we went back.
        if(combat.current.round < combat.previous.round) return;
        
        // we went back.
        if(combat.current.turn < combat.previous.turn && combat.current.round === combat.previous.round) return;
        
        // not active combat.
        if(!combat.isActive) return;
        
        // current, next, previous combatant index in turns.
        const indexCurr = combat.turns.indexOf(combat.combatant);
        const indexNext = indexCurr === (combat.turns.length - 1) ? 0 : (indexCurr + 1);
        const indexPrev = (combat.previous.round === 0) ? undefined : (indexCurr === 0 ? (combat.turns.length - 1) : (indexCurr - 1));
        
        // combatants:
        const combatants = {
            current:     combat.turns[indexCurr],
            previous:    combat.turns[indexPrev],
            next:        combat.turns[indexNext]
        };
        
        console.log(combatants);


        // Run the relevant function for the current, previous and next combatants
        combatAnnouncements.runForOwners(combatants.current,(combatant)=>{
            ui.notifications.info(game.i18n.format("announcement.current",{combatantName:combatant.name}))
            
        
        })
        //combatAnnouncements.runForOwners(combatants.previous,()=>{ui.notifications.info("")})
        combatAnnouncements.runForOwners(combatants.next,(combatant)=>{
            ui.notifications.info(game.i18n.format("announcement.next",{combatantName:combatant.name})) 
        })



    }

    static highLightToken(token){


    }

    static runForOwners(combatant,func){
        if (!combatant.players.includes(game.user)) return
        func(combatant)
    }

    static register(){
        Hooks.on("updateCombat",combatAnnouncements.getCombatants)
        Hooks.on("updateCombat",(combat,changes)=>{ // Popout the tracker once the combat is started
            if (changes.round === 1 && combat.turn === 0 && combat.started){
                new CombatTracker().createPopout().render(true)
            }
        })
        //Hooks.on("d")
    }
}