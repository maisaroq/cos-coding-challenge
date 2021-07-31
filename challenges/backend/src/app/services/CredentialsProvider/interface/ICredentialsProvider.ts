import {Credentials} from "../model/Credentials";

export interface ICredentialsProvider {
    getCredentials(): Promise<Credentials>;
}
