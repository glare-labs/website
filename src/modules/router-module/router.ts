
export type TRouteRecord = {
    url: string
    label: string
    iconString?: string
    description?: string
    id: number
}

interface IRouter {
    parentUrl: string
    routes: Array<TRouteRecord>
}
export type TRouter = IRouter

export class Router {
    public readonly parentUrl: string
    public readonly routes: Array<TRouteRecord>

    constructor(config: TRouter) {
        this.parentUrl = config.parentUrl
        this.routes = config.routes
    }


}

export function createRouter(config: TRouter) {
    return new Router(config)
}
