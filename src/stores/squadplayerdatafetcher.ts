import { apiCall } from "./util";

export class SquadPlayerDataFetcher {

    getPlayers = async () => {
        return await getSquad({
            targetTeam: 'jfuc'
        });
    }

    setPlayers = async (playerList: SquadPlayer[]) => {
        return await setSquad({
            targetTeam: 'jfuc',
            squads: playerList
        })
    }
}



export async function getSquad(request: BaseRequest): Promise<GetSquadResponse> {
    return await apiCall<BaseRequest, GetSquadResponse>(
        'squad',
        'getSquad',
        request,
        null,
        null,
        true
    );
}

export async function setSquad(request: SetSquadRequest): Promise<BaseResponse> {
    return await apiCall<SetSquadRequest, BaseResponse>(
        'squad',
        'setSquad',
        request,
        null,
        null,
        true
    );
}



export interface BaseRequest {
    targetTeam?: string
}

export interface BaseResponse {
    success: boolean;
    errorMessage?: string;
}

export interface SquadPlayer {
    uuid: string,
    name: string,
    overall: number,
    potentiel: number,
    minPotential?: number,
    maxPotential?: number
    status?: string,
    position: string[],
    country: string,
    contractType: string,
    age: number,
    value: number,
    wages: number
    atkWorkRate: string
    defWorkRate: string
    weakFoot: number
    technique: number
}

export interface GetSquadResponse extends BaseResponse {
    squads: SquadPlayer[]
    youths: SquadPlayer[]
}

export interface SetSquadRequest extends BaseRequest {
    squads: SquadPlayer[]
}