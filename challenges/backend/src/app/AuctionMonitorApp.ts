import {inject, injectable} from "inversify";
import "reflect-metadata";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {IAuctionAggregator} from "./services/DataAggregator/interface/IAuctionAggregator";
import {ILogger} from "./services/Logger/interface/ILogger";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private client: ICarOnSaleClient,
        @inject(DependencyIdentifier.AUCTION_AGGREGATOR) private aggregator: IAuctionAggregator,
    ) {
    }

    public async start(): Promise<void> {
        try {
            this.logger.log(`Auction Monitor started.`);
            const auctions = await this.client.getRunningAuctions();
            const aggregate = this.aggregator.aggregate(auctions);

            console.log(aggregate);  // tslint:disable-line:no-console
        } catch (ex) {
            this.logger.log(`Unexpected error happened: ${ex}`);
            process.exit(1);
        }
    }
}
