import axios from "axios";
import {inject, injectable} from "inversify";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {ILogger} from "../../Logger/interface/ILogger";
import {ICredentialsProvider} from "../interface/ICredentialsProvider";
import {Credentials} from "../model/Credentials";

@injectable()
export class CredentialsProvider implements ICredentialsProvider {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.USERNAME) private username: string,
        @inject(DependencyIdentifier.PASSWORD) private password: string
    ) {
    }

    public async getCredentials(): Promise<Credentials> {
        this.logger.log("Getting authentication credentials...");
        const response = await axios.put(`https://api-core-dev.caronsale.de/api/v1/authentication/${this.username}`, {
            password: this.password
        });

        return {
            token: response.data.token,
            userId: response.data.userId
        };
    }
}
