import { makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { SquadsStore } from '../stores/stores';

type UIState = 'loading' | 'show' | 'error';

class SquadsModel {

    _uiState: UIState = 'loading'

    get uiState() {
        return this._uiState
    }

    set uiState(newState: UIState) {
        runInAction(() => {
            this._uiState = newState
        })
    }

    constructor() {
        makeAutoObservable(this)
        this.loadData()
    }

    loadData = async () => {
        try {
            this.uiState = 'loading'
            console.debug("before")
            const squadValues = await SquadsStore.getAllSquadPlayers()
            console.debug("after")
            this.uiState = 'show'
        } catch (err) {
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

const SquadsInnerPage: React.FC<{ model: SquadsModel }> = observer(({ model }) => {
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
        <div>voila</div>
    )
})

const SquadsPage = () => {//
    const [model, setModel] = useState<SquadsModel>(new SquadsModel())
    return <SquadsInnerPage model={model} />
}


function linkFC(): string {
    return `/squads`
}

export const squadsPageRoute = {
    squadsPage: {
        path: `/squads`,
        link: linkFC,
        model: SquadsModel,
        component: SquadsPage,
        Redirect() { return <Redirect to={linkFC()} />; }
    }
};
