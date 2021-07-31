import {injectable} from "inversify";
import "reflect-metadata";
import {ILogger} from "../interface/ILogger";

@injectable()
export class Logger implements ILogger {
    public log(message: string): void {
        console.log(`[LOG]: ${message}`); // tslint:disable-line:no-console
    }
}
