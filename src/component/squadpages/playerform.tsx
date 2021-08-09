import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab";
import { makeAutoObservable, runInAction } from "mobx";
import { observer } from "mobx-react"

export class PlayerFormModel {

    _name: string = "";

    get name() {
        return this._name;
    }

    set name(newName: string) {
        runInAction(() => {
            this._name = newName
        })
    }

    _uuid: string = "";

    get uuid() {
        return this._uuid;
    }

    set uuid(newUuid: string) {
        runInAction(() => {
            this._uuid = newUuid
        })
    }

    _overall: number = 0;

    get overall() {
        return this._overall;
    }

    set overall(newOverall: number) {
        runInAction(() => {
            this._overall = newOverall
        })
    }

    _potential: number = 0;

    get potential() {
        return this._potential;
    }

    set potential(newPotential: number) {
        runInAction(() => {
            this._potential = newPotential
        })
    }

    _minPotential: number = 0;

    get minPotential() {
        return this._minPotential;
    }

    set minPotential(newPotential: number) {
        runInAction(() => {
            this._minPotential = newPotential
        })
    }

    setMinPotential = (newPotential: number) => {
        this.minPotential = newPotential;
        this.potential = this.minPotential + (this.maxPotential - this.minPotential) / 2
        console.debug(this.potential)
    }

    setMaxPotential = (newPotential: number) => {
        this.maxPotential = newPotential;
        this.potential = this.minPotential + (this.maxPotential - this.minPotential) / 2
        console.debug(this.potential)
    }

    _maxPotential: number = 0;

    get maxPotential() {
        return this._maxPotential;
    }

    set maxPotential(newPotential: number) {
        runInAction(() => {
            this._maxPotential = newPotential
        })
    }

    _price: number = 0;

    get price() {
        return this._price;
    }

    set price(newPrice: number) {
        runInAction(() => {
            this._price = newPrice
        })
    }

    _wages: number = 0;

    get wages() {
        return this._wages;
    }

    set wages(newWages: number) {
        runInAction(() => {
            this._wages = newWages
        })
    }

    _age: number = 0;

    get age() {
        return this._age;
    }

    set age(newAge: number) {
        runInAction(() => {
            this._age = newAge
        })
    }

    _positions: string[] = []

    get positions() {
        return this._positions;
    }

    set positions(newPosition: string[]) {
        runInAction(() => {
            this._positions = newPosition
        })
    }

    _nation: string = "";

    get nation() {
        return this._nation;
    }

    set nation(newNation: string) {
        runInAction(() => {
            this._nation = newNation
        })
    }

    _playerStatus: string = "";

    get playerStatus() {
        return this._playerStatus;
    }

    set playerStatus(newStatus: string) {
        runInAction(() => {
            this._playerStatus = newStatus
        })
    }

    _contract: string = "";

    get contract() {
        return this._contract;
    }

    set contract(newContract: string) {
        runInAction(() => {
            this._contract = newContract
        })
    }

    _attackWorkRate: string = "";

    get attackWorkRate() {
        return this._attackWorkRate;
    }

    set attackWorkRate(newAttackWorkRate: string) {
        runInAction(() => {
            this._attackWorkRate = newAttackWorkRate
        })
    }

    _defenseWorkRate: string = "";

    get defenseWorkRate() {
        return this._defenseWorkRate;
    }

    set defenseWorkRate(newdefenseWorkRate: string) {
        runInAction(() => {
            this._defenseWorkRate = newdefenseWorkRate
        })
    }

    _weakFoot: number = 0;

    get weakFoot() {
        return this._weakFoot;
    }

    set weakFoot(newWeakFoot: number) {
        runInAction(() => {
            this._weakFoot = newWeakFoot
        })
    }

    _skillMoves: number = 0;

    get skillMoves() {
        return this._skillMoves;
    }

    set skillMoves(newSkillMoves: number) {
        runInAction(() => {
            this._skillMoves = newSkillMoves
        })
    }

    constructor() {
        makeAutoObservable(this)
    }

    get playerStatusOptions() {
        return ["Main Team", "Injured", "Not Scanned", "Loaned Out", "Scanned"]
    }

    get contractOptions() {
        return ["Crucial", "Important", "SquadRotation", "Sporadic", "Future", "Academy"]
    }

    get workRateOption() {
        return ["High", "Medium", "Low"]
    }

    get isYouthAcademy() {
        return this.contract === "Academy"
    }
}

export const PlayerForm = observer(({ model }: { model: PlayerFormModel }) => {
    return (
        <Grid container>
            <Grid container item xs={12} justify="center">
                <Typography >
                    {model.name}
                </Typography>
            </Grid>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="overall"
                label="Player Overall"
                type="number"
                value={model.overall}
                onChange={(e) => { model.overall = Number.parseInt(e.target.value) }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="value"
                label="Player value"
                type="number"
                value={model.price}
                onChange={(e) => { model.price = Number.parseInt(e.target.value) }}
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="age"
                label="Player Age"
                type="number"
                value={model.age}
                onChange={(e) => { model.age = Number.parseInt(e.target.value) }}
            />

            <Autocomplete
                options={model.playerStatusOptions}
                value={model.playerStatus}
                onChange={(event, newVal) => { model.playerStatus = newVal || "Main Team" }}
                fullWidth
                renderInput={(params) => <TextField  {...params} label="Player Status" variant="outlined" />}
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="wages"
                label="Player Wages"
                type="number"
                value={model.wages}
                onChange={(e) => { model.wages = Number.parseInt(e.target.value) }}
            />

            <Autocomplete
                options={model.contractOptions}
                value={model.contract}
                onChange={(event, newVal) => { model.contract = newVal || "Academy" }}
                fullWidth
                renderInput={(params) => <TextField  {...params} label="Contract" variant="outlined" />}
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="name"
                label="Player Name"
                type="text"
                value={model.name}
                onChange={(e) => { model.name = e.target.value }}
            />

            {
                model.isYouthAcademy ? (<TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="minPotentiel"
                    label="Potentiel Minimum"
                    type="number"
                    value={model.minPotential}
                    onChange={(e) => { model.setMinPotential(Number.parseInt(e.target.value)) }}
                />) : (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Potentiel"
                            label="Potentiel"
                            type="number"
                            value={model.potential}
                            onChange={(e) => { model.potential = Number.parseInt(e.target.value) }}
                        />
                    )
            }

            {
                model.isYouthAcademy && (<TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="maxPotentiel"
                    label="Potentiel Maximum"
                    type="number"
                    value={model.maxPotential}
                    onChange={(e) => { model.setMaxPotential(Number.parseInt(e.target.value)) }}
                />)
            }


            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="position"
                label="Position(s)"
                type="text"
                value={model.positions.toString()}
                onChange={(e) => { model.positions = e.target.value.split(",") }}
            />

            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="Nation"
                label="Nation"
                type="text"
                value={model.nation}
                onChange={(e) => { model.nation = e.target.value }}
            />

            <Autocomplete
                options={model.workRateOption}
                value={model.attackWorkRate}
                onChange={(event, newVal) => { model.attackWorkRate = newVal || "Low" }}
                fullWidth
                renderInput={(params) => <TextField  {...params} label="Attack Work Rate" variant="outlined" />}
            />

            <Autocomplete
                options={model.workRateOption}
                value={model.defenseWorkRate}
                onChange={(event, newVal) => { model.defenseWorkRate = newVal || "Low" }}
                fullWidth
                renderInput={(params) => <TextField  {...params} label="Defense Work Rate" variant="outlined" />}
            />
            <FormLabel component="legend">Weak Foot</FormLabel>
            <RadioGroup row aria-label="weakfoot" name="weakFoot" value={model.weakFoot.toString()} onChange={(e) => { model.weakFoot = Number.parseInt(e.target.value) }}>
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>

            <FormLabel component="legend">Skill Moves</FormLabel>
            <RadioGroup row aria-label="skillmoves" name="skillMoves" value={model.skillMoves.toString()} onChange={(e) => { model.skillMoves = Number.parseInt(e.target.value) }}>
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
        </Grid>
    )
})