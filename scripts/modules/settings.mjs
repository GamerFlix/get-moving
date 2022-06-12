import { MODULE } from "../module.mjs";

export class Settings{

    static settingsDefinition(){
        const config=true
        const settingsData={
            defaultNextSound:{scope:"world",config,default:"",type:String},
            defaultCurrentSound:{scope:"world",config,default:"",type:String},
            defaultCurrentMarker:{scope:"world",config,default:"",type:String}
        }

        Settings.applySettings(settingsData)


    }

    static applySettings(settingsData) {
        Object.entries(settingsData).forEach(([key, data]) => {
          game.settings.register(
            MODULE.NAME, key, {
              name: game.i18n.localize(`setting.${key}.name`),
              hint: game.i18n.localize(`setting.${key}.hint`),
              ...data
            }
          );
        });
      }

    static register(){
        Settings.settingsDefinition();
    }

}