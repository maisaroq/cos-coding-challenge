import {Container} from "inversify";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CredentialsProvider} from "./services/CredentialsProvider/classes/CredentialsProvider";
import {ICredentialsProvider} from "./services/CredentialsProvider/interface/ICredentialsProvider";
import {AuctionAggregator} from "./services/DataAggregator/classes/AuctionAggregator";
import {IAuctionAggregator} from "./services/DataAggregator/interface/IAuctionAggregator";
import {Logger} from "./services/Logger/classes/Logger";
import {ILogger} from "./services/Logger/interface/ILogger";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<ICredentialsProvider>(DependencyIdentifier.CREDENTIALS_PROVIDER).to(CredentialsProvider);
container.bind<IAuctionAggregator>(DependencyIdentifier.AUCTION_AGGREGATOR).to(AuctionAggregator);
container.bind<string>(DependencyIdentifier.USERNAME).toConstantValue("salesman@random.com");
container.bind<string>(DependencyIdentifier.PASSWORD).toConstantValue("123test");

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
