import {logger} from "logger";
import {merge} from "utils-array"

logger("Application started");

const arr = ["bla"];

const test = merge(['super', 'test', arr as any])
logger(test);

