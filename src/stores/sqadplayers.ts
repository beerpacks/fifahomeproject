import { ListSubheader } from "@material-ui/core"
import { SquadPlayerDataFetcher } from "./squadplayerdatafetcher"
import { later } from "./util";

export class SquadPlayersStore {
    dataFetcher: SquadPlayerDataFetcher = new SquadPlayerDataFetcher()
    getAllSquadPlayers = async () => {
        await later(1000);
        return []
        try {
            //const serverRequest = await this.dataFetcher.getPlayers();
            /* if(serverRequest){
 
             }*/
        } catch (err) {

        }
        /*
        let values = await getSquad({
            targetTeam: 'jfuc'
        });
        if (values.success) {
            this.playerList = observable.array(values.squads.map(player => {
                return new Player(player.name, player.contractType, player.uuid, player.age, player.country, player.overall, player.position, player.potentiel, player.wages, player.value, player.atkWorkRate, player.defWorkRate, player.weakFoot, player.technique)
            }))
            this.youths = observable.array(values.youths.map(player => {
                return new Player(player.name, player.contractType, player.uuid, player.age, player.country, player.overall, player.position, player.potentiel, player.wages, player.value, player.atkWorkRate, player.defWorkRate, player.weakFoot, player.technique)
            }))
        }*/
    }
}