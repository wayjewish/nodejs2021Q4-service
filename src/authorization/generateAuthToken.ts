import jwt from 'jsonwebtoken';
// import CONFIG from '../common/config';
import { IUser } from '../resources/users/user.types';

const generateAuthToken = async (user: IUser): Promise<string> => {
    const token = jwt.sign(
        {
            userId: user.id,
            login: user.login,
        }, 
        'secret-key',
    );

    return token;
}

export default generateAuthToken;
