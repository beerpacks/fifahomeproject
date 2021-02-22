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
import { uuidv4 } from "../stores/util"

type UIState = 'loading' | 'show' | 'error';

class NewPlayerPageModel {

    newPlayerModel: PlayerFormModel = new PlayerFormModel()

    constructor() {
        makeAutoObservable(this)
    }

    _uiState: UIState = 'show'
    get uiState() {
        return this._uiState
    }

    set uiState(newState: UIState) {
        runInAction(() => {
            this._uiState = newState
        })
    }

    saveData = async () => {
        try {
            this.uiState = 'loading'
            const playerValues = await SquadsStore.addPlayer(
                {
                    name: this.newPlayerModel.name,
                    overall: this.newPlayerModel.overall,
                    value: this.newPlayerModel.price,
                    wages: this.newPlayerModel.wages,
                    contractType: this.newPlayerModel.contract,
                    potentiel: this.newPlayerModel.potential,
                    position: this.newPlayerModel.positions,
                    country: this.newPlayerModel.nation,
                    atkWorkRate: this.newPlayerModel.attackWorkRate,
                    defWorkRate: this.newPlayerModel.defenseWorkRate,
                    weakFoot: this.newPlayerModel.weakFoot,
                    technique: this.newPlayerModel.skillMoves,
                    age: this.newPlayerModel.age,
                    uuid: uuidv4(),
                    maxPotential: this.newPlayerModel.maxPotential,
                    minPotential: this.newPlayerModel.minPotential,
                    status: this.newPlayerModel.playerStatus
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



const NewPlayerInnerPage = observer(({ model }: { model: NewPlayerPageModel }) => {
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
                        component={RouterLink}
                        variant="outlined"
                        color="secondary"
                        to={SiteRoutes.squadsPage.link()}
                    >Close
                    </Button>
                </Toolbar>
            </AppBar>
            <PlayerForm model={model.newPlayerModel} />
        </MasterPage>
    )
})

const NewPlayerPage = () => {//
    const [model, setModel] = useState<NewPlayerPageModel>(new NewPlayerPageModel())

    return <NewPlayerInnerPage model={model} />
}


function linkFC(): string {
    return "/newplayer";
}

export const newPlayerPageRoute = {
    newPlayerPage: {
        path: "/newplayer",
        link: linkFC,
        model: NewPlayerPageModel,
        component: NewPlayerPage,
        Redirect() { return <Redirect to={linkFC()} />; }
    }
};