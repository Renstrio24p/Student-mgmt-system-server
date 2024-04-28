
type Host = {
    host: string,
    port: number
}

type Cors = ['GET', 'POST', 'PUT', 'DELETE']

type Headers = string

export type Driver = {
    database: string,
    port: number
}

export type Config = {
    dest_port: number,
    admin_port: number,
    url: {
        online: Host,
        offline: Host
    },
    methods: Cors,
    allowedHeaders: Headers[]
}


export type Cred = {
    username: string,
    password: string
}

export type PromiseExpress = Promise<void | {}>