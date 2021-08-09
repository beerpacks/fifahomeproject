import { AppBar, Button, Toolbar } from "@material-ui/core";
import { observer } from "mobx-react";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Redirect, useParams } from "react-router";
import { MasterPage } from "../component/masterpage";
import { SiteRoutes } from "../sitesroutesmap";
import { makeAutoObservable, runInAction } from "mobx";
import { SquadsStore } from "../stores/stores";
import { PlayerForm, PlayerFormModel } from "../component/squadpages/playerform"


type UIState = 'loading' | 'show' | 'error';

class EditPlayerPageModel {

    editPlayerModel: PlayerFormModel = new PlayerFormModel()

    constructor(public params: Params) {
        makeAutoObservable(this)
        this.loadData()
    }

    _uiState: UIState = 'loading'
    get uiState() {
        return this._uiState
    }

    set uiState(newState: UIState) {
        runInAction(() => {
            this._uiState = newState
        })
    }

    loadData = async () => {
        try {
            this.uiState = 'loading'
            const playerValues = await SquadsStore.getPlayer(this.params.id)
            if (!playerValues)
                throw new Error('Cannot load player')
            console.debug(JSON.stringify(playerValues))
            this.editPlayerModel.name = playerValues.name
            this.editPlayerModel.overall = playerValues.overall
            this.editPlayerModel.price = playerValues.value
            this.editPlayerModel.age = playerValues.age
            this.editPlayerModel.playerStatus = playerValues.status || "Main Team"//
            this.editPlayerModel.wages = playerValues.wages
            this.editPlayerModel.contract = playerValues.contractType
            this.editPlayerModel.potential = playerValues.potentiel > 0 ? playerValues.potentiel : ((playerValues.minPotential || 0) + ((playerValues.maxPotential || 0) - (playerValues.minPotential || 0)) / 2)
            this.editPlayerModel.minPotential = playerValues.minPotential || 0
            this.editPlayerModel.maxPotential = playerValues.maxPotential || 0
            this.editPlayerModel.positions = playerValues.position
            this.editPlayerModel.nation = playerValues.country
            this.editPlayerModel.attackWorkRate = playerValues.atkWorkRate
            this.editPlayerModel.defenseWorkRate = playerValues.defWorkRate
            this.editPlayerModel.weakFoot = playerValues.weakFoot
            this.editPlayerModel.skillMoves = playerValues.technique
            this.uiState = 'show'
        } catch (err) {
            console.debug(err)
            this.uiState = 'error'
        }
    }

    saveData = async () => {
        try {
            this.uiState = 'loading'
            const playerValues = await SquadsStore.setPlayer(
                {
                    name: this.editPlayerModel.name,
                    overall: this.editPlayerModel.overall,
                    value: this.editPlayerModel.price,
                    wages: this.editPlayerModel.wages,
                    contractType: this.editPlayerModel.contract,
                    potentiel: this.editPlayerModel.potential,
                    position: this.editPlayerModel.positions,
                    country: this.editPlayerModel.nation,
                    atkWorkRate: this.editPlayerModel.attackWorkRate,
                    defWorkRate: this.editPlayerModel.defenseWorkRate,
                    weakFoot: this.editPlayerModel.weakFoot,
                    technique: this.editPlayerModel.skillMoves,
                    age: this.editPlayerModel.age,
                    uuid: this.params.id,
                    maxPotential: this.editPlayerModel.maxPotential,
                    minPotential: this.editPlayerModel.minPotential,
                    status: this.editPlayerModel.playerStatus
                }
            )
            if (!playerValues)
                throw new Error('Cannot save player')
            this.uiState = 'show'
        } catch (err) {
            console.debug(err)
            this.uiState = 'error'
        }
    }

    get show() {
        return this.uiState === 'show'
    }

    get loading() {
        return this.uiState === 'loading'
    }

    get error() {
        return this.uiState === 'error'
    }

}



const EditPlayerInnerPage = observer(({ model }: { model: EditPlayerPageModel }) => {
    if (model.loading) {
        return (
            <div>je load</div>
        )
    }

    if (model.error) {
        return (
            <div>eror</div>
        )
    }

    return (
        <MasterPage>
            <AppBar position="relative">
                <Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={model.saveData}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                    >Delete
                    </Button>
                    <Button
                        component={RouterLink}
                        variant="outlined"
                        color="secondary"
                        to={SiteRoutes.squadsPage.link()}
                    >Close
                    </Button>
                </Toolbar>
            </AppBar>
            <PlayerForm model={model.editPlayerModel} />
        </MasterPage>
    )
})

const EditPlayerPage = () => {//
    const [model, setModel] = useState<EditPlayerPageModel>(new EditPlayerPageModel(editPlayerPageRoute.editPlayerPage.useParams()))

    return <EditPlayerInnerPage model={model} />
}


function linkFC(id: string): string {
    return "/editplayer/" + id;
}

interface Params {
    id: string
}

export const editPlayerPageRoute = {
    editPlayerPage: {
        path: "/editplayer/:id",//`/squads`,
        link: linkFC,
        model: EditPlayerPageModel,
        component: EditPlayerPage,
        useParams(): Params {
            const { id } = useParams<{ id: string }>();
            return {
                id: id
            }
        },
        Redirect({ id }: { id: string }) { return <Redirect to={linkFC(id)} />; }
    }
};