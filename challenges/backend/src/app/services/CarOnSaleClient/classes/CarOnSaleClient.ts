import axios from "axios";
import {inject, injectable} from "inversify";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {Auction} from "../../../model/Auction";
import {ICredentialsProvider} from "../../CredentialsProvider/interface/ICredentialsProvider";
import {ILogger} from "../../Logger/interface/ILogger";
import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CREDENTIALS_PROVIDER) private credentialsProvider: ICredentialsProvider
    ) {
    }

    public async getRunningAuctions(): Promise<Auction[]> {
        const credentials = await this.credentialsProvider.getCredentials();

        this.logger.log("Getting auctions...");
        const response = await axios.get("https://api-core-dev.caronsale.de/api/v2/auction/buyer/", {
            headers: {
                "authtoken": credentials.token,
                "userid": credentials.userId,
            }
        });

        return response.data.items as Auction[];
    }
}
