import {Auction} from "../../../model/Auction";
import {Aggregate} from "../model/Aggregate";

export interface IAuctionAggregator {
    aggregate(auction: Auction[]): Aggregate;
}
