import {injectable} from "inversify";
import {Auction} from "../../../model/Auction";
import {IAuctionAggregator} from "../interface/IAuctionAggregator";
import {Aggregate} from "../model/Aggregate";

@injectable()
export class AuctionAggregator implements IAuctionAggregator {
    public aggregate(auctions: Auction[]): Aggregate {
        const total = auctions.length;
        const sums = auctions.reduce((acc, item) => {
            return {
                sumBids: acc.sumBids + item.numBids,
                sumProgress: acc.sumProgress + (item.minimumRequiredAsk / item.currentHighestBidValue),
            };
        }, {sumBids: 0, sumProgress: 0});

        return {
            total,
            avgBids: sums.sumBids / total,
            avgProgress: sums.sumProgress / total,
        };
    }
}
