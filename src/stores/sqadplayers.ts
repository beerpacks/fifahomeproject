import { ListSubheader } from "@material-ui/core"
import { SquadPlayer, SquadPlayerDataFetcher } from "./squadplayerdatafetcher"
import { later, uuidv4 } from "./util";

export class SquadPlayersStore {
    dataFetcher: SquadPlayerDataFetcher = new SquadPlayerDataFetcher()

    allPlayers: SquadPlayer[] = []

    getAllSquadPlayers = async () => {
        try {
            if (this.allPlayers.length < 1) {
                const serverRequest = await this.dataFetcher.getPlayers();
                if (!serverRequest.success) {
                    throw new Error("cannot load player")
                }
                this.allPlayers = [...serverRequest.squads, ...serverRequest.youths.map(youth => {
                    console.debug("je rentre")
                    youth.uuid = uuidv4()
                    console.debug("youth uuid " + youth.uuid)
                    return youth
                })]
            }
            return this.allPlayers
        } catch (err) {
            return []
        }
    }

    getPlayer = async (playerId: string) => {
        try {
            const searchedPlayer: SquadPlayer | undefined = this.allPlayers.find(player => player.uuid === playerId);
            if (searchedPlayer)
                return searchedPlayer;
        } catch (err) {
            return undefined
        }
    }

    setPlayer = async (newPlayer: SquadPlayer) => {
        const position = this.allPlayers.findIndex(player => player.uuid === newPlayer.uuid)
        if (position > -1) {
            this.allPlayers[position] = newPlayer
        }
        try {
            const serverRequest = await this.dataFetcher.setPlayers(this.allPlayers);
            if (!serverRequest.success)
                throw new Error('')
            return true
        } catch (err) {
            return false
        }
    }

    addPlayer = async (newPlayer: SquadPlayer) => {
        this.allPlayers.push(newPlayer)
        try {
            const serverRequest = await this.dataFetcher.setPlayers(this.allPlayers);
            if (!serverRequest.success)
                throw new Error('')
            return true
        } catch (err) {
            return false
        }
    }
}