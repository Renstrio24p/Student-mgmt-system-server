import { Config, Cred, Driver } from "./types/config";

const driver: Driver = {
    database: 'NTHS',
    port: 27017
}

const cred: Cred = {
    username: '',
    password: ''
}

export const config: Config = {
    dest_port: 4650,
    admin_port: 4500,
    url: {
        online: {
            host: `mongodb+srv://${cred.username}:${cred.password}@gp2-cloud.pefe5tc.mongodb.net/${driver.database}`,
            port: 4000
        },
        offline: {
            host: `mongodb://localhost:${driver.port}/${driver.database}`,
            port: 4000
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}