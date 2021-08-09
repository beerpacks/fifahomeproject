import { AppBar, Box, Button, createStyles, Grid, makeStyles, Menu, Paper, TextField, Theme, Toolbar, Typography, Link, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Menu as MenuIcon } from '@material-ui/icons'
import { computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { MasterPage } from '../component/masterpage';
import { SiteRoutes } from '../sitesroutesmap';
import { SquadsStore } from '../stores/stores';
import { uuidv4 } from '../stores/util';

type UIState = 'loading' | 'show' | 'error';

export class Player {
    id: string
    name: string
    contractType: string
    age: number
    country: string
    overall: number
    position: string[]
    potentiel: number
    isEdditing: boolean
    wage: number
    value: number
    atkWorkRate: string
    defWorkRate: string
    weakFoot: number
    technique: number
    constructor(name: string, contract?: string, id?: string, age?: number, country?: string, overall?: number, position?: string[], potentiel?: number, wage?: number, value?: number, atkWorkRate?: string, defWorkRate?: string, weakFoot?: number, technique?: number) {
        makeAutoObservable(this)
        this.id = id && id?.length > 0 ? id : uuidv4()
        this.name = name;
        this.age = age ? age : 0
        this.country = country && country.length > 0 ? country : ""
        this.overall = overall ? overall : 0
        this.position = position && position.length > 0 ? position : []
        this.potentiel = potentiel ? potentiel : 0
        this.contractType = contract ? contract : "Future"
        this.isEdditing = false
        this.wage = wage ? wage : 0
        this.value = value ? value : 0
        this.atkWorkRate = atkWorkRate || "Low"
        this.defWorkRate = defWorkRate || "Low"
        this.weakFoot = weakFoot || 0
        this.technique = technique || 0
    }

    get fullRating() {
        return this.potentiel +
            (this.atkWorkRate === "High" ? 100 : this.atkWorkRate === "Medium" ? 50 : 0) +
            (this.defWorkRate === "High" ? 100 : this.defWorkRate === "Medium" ? 50 : 0) +
            (this.weakFoot * 20) +
            (this.technique * 20)
    }

    get isEditable() {
        return this.contractType != "Academy"
    }

    get positions() {
        return this.position.length > 0 ? this.position.join() : []
    }

    get trainingValue() {
        return this.potentiel - this.overall
    }

    setPosition(pos: string) {
        this.position = pos.split(",")
    }

    get valueText() {
        if (!(this.value / 1000000).toString().startsWith("0")) {
            return ((this.value / 1000000).toFixed(1)) + " M"
        }
        return ((this.value / 1000)) + " K"
    }


    get wagesText() {
        if ((this.wage / 1000) > 0) {
            return ((this.wage / 1000)) + " K"
        }
        return this.wage
    }
}

class SquadsModel {

    _uiState: UIState = 'loading'
    _playerList: Player[] = []
    sortBy: string = "value"

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
            const squadValues = await SquadsStore.getAllSquadPlayers()
            runInAction(() => {
                this._playerList = squadValues.map(player => {
                    return new Player(player.name, player.contractType, player.uuid, player.age, player.country, player.overall, player.position, player.potentiel > 0 ? player.potentiel : ((player.maxPotential || 0 - (player.minPotential || 0)) / 2 + (player.minPotential || 0)), player.wages, player.value, player.atkWorkRate, player.defWorkRate, player.weakFoot, player.technique)
                })
            })
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

    get playerList() {
        if (this.filterPos === null) {
            return this._playerList
        }
        const filter = this.filterPos
        return this._playerList.filter(player => player.position.includes(filter))
    }

    get NbChilePlayers() {
        return this._playerList.filter(player => player.country === "Chile").length
    }

    get NbOtherCountryPlayers() {
        return this._playerList.length - this.NbChilePlayers;
    }

    get NbYouth() {
        return this._playerList.filter(player => player.age < 22).length
    }

    get players() {
        return this.playerList.slice().sort(this.sortingByValue)
    }

    setFilter = (filterSelected: string | null) => {
        this.filterPos = filterSelected
    }

    filterPos: string | null = null;

    get filterPosition() {
        return this.filterPos
    }

    set filterPosition(newFilter: string | null) {
        runInAction(() => {
            this.filterPos = newFilter
        })
    }

    get sortedOption() {
        return ["value", "overall", "potentiel", "trainnableOverall", "wages", "positions", "age", "contract"]
    }

    get positionFilterOptions() {
        return ["LW", "ST", "RW", "CAM", "CM", "CDM", "LB", "CB", "RB", "GK"]
    }

    setSortValue = (newVal: string | null) => {
        runInAction(() => {
            this.sortBy = newVal ? newVal : "value"
        })
    }

    sortingByValue = (recruits1: Player, recruits2: Player) => {
        if (this.sortBy === "age")
            return recruits1.age > recruits2.age ? -1 : 1
        else if (this.sortBy === "contract")
            return -1//recruits1.age > recruits2.age ? -1 : 1
        else if (this.sortBy === "overall")
            return recruits1.overall > recruits2.overall ? -1 : 1
        else if (this.sortBy === "positions")
            return -1//recruits1.overall > recruits2.overall ? -1 : 1
        else if (this.sortBy === "potentiel")
            return recruits1.potentiel > recruits2.potentiel ? -1 : 1
        else if (this.sortBy === "trainnableOverall")
            return recruits1.trainingValue > recruits2.trainingValue ? -1 : 1
        else if (this.sortBy === "wages")
            return recruits1.wage > recruits2.wage ? -1 : 1
        else
            return recruits1.value > recruits2.value ? -1 : 1
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const SquadsInnerPage: React.FC<{ model: SquadsModel }> = observer(({ model }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClickBurgerIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
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
                    <IconButton id="menuOpen" onClick={handleClickBurgerIcon} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="main-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <Button
                            component={RouterLink}
                            variant="contained"
                            color="primary"
                            to={SiteRoutes.newPlayerPage.link()}
                        >new player</Button>
                    </Menu>

                    <Typography variant="h6" className={classes.title}>
                        Chile:{model.NbChilePlayers}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        Other:{model.NbOtherCountryPlayers}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        Youth:{model.NbYouth}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item container xs={3}>
                        <Typography>Filter:</Typography>
                    </Grid>
                    <Grid item container xs={9}>
                        <Autocomplete
                            options={model.positionFilterOptions}
                            value={model.filterPosition}
                            onChange={(event, newVal) => { model.setFilter(newVal) }}
                            fullWidth
                            renderInput={(params) => <TextField  {...params} label="Filter" variant="outlined" />}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item container xs={3}>
                        <Typography>Sort By:</Typography>
                    </Grid>
                    <Grid item container xs={9}>
                        <Autocomplete
                            options={model.sortedOption}
                            value={model.sortBy}
                            onChange={(event, newVal) => { model.setSortValue(newVal) }}
                            fullWidth
                            renderInput={(params) => <TextField  {...params} label="" variant="outlined" />}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <SquadListView players={model.players} />
                </Grid>
            </Grid>
        </MasterPage>
    )
})

const SquadListView = observer(({ players }: { players: Player[] }) => {
    return (
        <Box width={1} style={{ maxHeight: '80vh', minHeight: 0, overflow: 'auto' }}>
            <Grid id="brewerMainList" container style={{ background: "transparent" }} spacing={1}>
                {
                    players.map(player => {
                        return (
                            <SquadView player={player} />
                        )
                    })
                }
            </Grid>
        </Box>
    )
})

const SquadView = observer(({ player }: { player: Player }) => {
    return (
        <Grid key={player.id} item xs={12}>
            <Link component={RouterLink} to={SiteRoutes.editPlayerPage.link(player.id)}>
                <Paper>
                    <Grid item container direction="row" style={{ padding: 5 }}>
                        <Grid direction="column" justify="flex-end" container item xs={4}>
                            <Typography>
                                {player.age} y.o.
                        </Typography>
                            <Typography>
                                {player.contractType}
                            </Typography>
                        </Grid>
                        <Grid direction="column" container item xs={7}>
                            <Typography>
                                {player.name}
                            </Typography>
                            <Typography>
                                {player.overall} Ovr
                        </Typography>
                            <Typography>
                                {player.potentiel} Pot
                        </Typography>
                            <Typography>
                                {player.positions}
                            </Typography>
                        </Grid>
                        <Grid container item xs={1}>
                            <Typography>
                                {player.trainingValue.toString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Link>
        </Grid>
    )
})

const SquadsPage = () => {//
    const [model, setModel] = useState<SquadsModel>(new SquadsModel())

    return <SquadsInnerPage model={model} />
}


function linkFC(): string {
    return "/";//`/squads`
}

export const squadsPageRoute = {
    squadsPage: {
        path: "/",//`/squads`,
        link: linkFC,
        model: SquadsModel,
        component: SquadsPage,
        Redirect() { return <Redirect to={linkFC()} />; }
    }
};
