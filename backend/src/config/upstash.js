
import {Ratelimit} from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

//we are allowing 100 request per 60seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100,"60 s")
})

export default ratelimit;