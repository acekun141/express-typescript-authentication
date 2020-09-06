import * as redis from "redis";
import { promisify } from "util";

class RedisService {
  public client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  });

  constructor() {
    this.client.on("error", function() {
      console.log("Redis error");
    })
  }

  public getAsync = promisify(this.client.get).bind(this.client);
  public setAsync = promisify(this.client.set).bind(this.client);
  public setexAsync = promisify(this.client.setex).bind(this.client);
}

export default RedisService;