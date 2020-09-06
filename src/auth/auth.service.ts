import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as config from "../_helper/config.json";
import * as uuid from "uuid";
import IUser from "../user/user.interface";
import UserModel from "../user/user.model";
import RedisService from "../_helper/redis";
import {
  UserWithEmailAlreadyExisted,
  UserWithUsernameAlreadyExisted,
  WrongCredential
} from "../_exception";

class AuthenticationService {
  public user = UserModel;
  private redisClient = new RedisService();

  public async register(userData: IUser) {
    const userWithEmail = await this.user.findOne({ email: userData.email });
    const userWithUsername = await this.user.findOne({ username: userData.username });

    if (userWithEmail) throw new UserWithEmailAlreadyExisted(userData.email);
    if (userWithUsername) throw new UserWithUsernameAlreadyExisted(userData.username);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user: IUser = await this.user.create({
      ...userData,
      password: hashedPassword
    });

    return `Register user ${user.username} successful`;
  }

  public async login(userData: Pick<IUser, "username" | "password">) {
    const user = await this.user.findOne({ username: userData.username });

    if (user) {
      const userPassword = user.password;
      const comparePassword = await bcrypt.compare(userData.password, userPassword);

      if (comparePassword) {
        const refreshToken = uuid.v4();
        const accessToken = jwt.sign(
          { _id: user._id },
          process.env.SECRET_KEY,
          { expiresIn: config.accessTokenLife }
        );

        this.redisClient.setexAsync(
          refreshToken,
          config.refreshTokenLife,
          JSON.stringify({ accessToken, user: user._id })
        );

        const tokenData = { accessToken, refreshToken };

        return tokenData;
      }
    }
    throw new WrongCredential();
  }

  public async refresh(refreshToken: string, user_id: string) {
    try {
      const tokenData = await this.redisClient.getAsync(refreshToken);
      const { user } = JSON.parse(tokenData);

      if (tokenData && user === user_id) {
        const accessToken = jwt.sign(
          { _id: user._id },
          process.env.SECRET_KEY,
          { expiresIn: config.accessTokenLife }
        );
        
        this.redisClient.setAsync(refreshToken, JSON.stringify({ accessToken, user }));

        return accessToken;
      } else {
        throw new WrongCredential();
      }
    } catch(error) {
      throw error;
    }
  }
}

export default AuthenticationService;