import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../resources/users/user.model';

const admin = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
};

const addAdmin = async () => {
    const userRepository = getRepository(User);
    const foundAdmin = await userRepository.findOne({ login: admin.login });

    if (foundAdmin) return;
      
    const password = await bcrypt.hash(admin.password, 10);
    const user = userRepository.create({
        ...admin,
        password,
    });
    await userRepository.save(user);
    console.log('add admin');
}

export default addAdmin;

