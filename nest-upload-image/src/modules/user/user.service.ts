import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
CreateUserDto;

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async setUserBaseData(signUpUserDto: CreateUserDto): Promise<any> {
    const { email, password, lastName } = signUpUserDto;
    console.log("password",password)
    let user: any = {};
    if (await this.findUserByEmail(email)) {
      throw new ConflictException(
        `Email ${email} is not available, please try another one`,
      );
    } else {
      user.email = email;
    }
    user.password = await bcrypt.hash(password, 10);
    user.lastName = lastName;
    return user;
  }

  async signUpUser(signUpUserDto: any /* SignUpUserDto */, file): Promise<any> {
   /* const user = await this.setUserBaseData(signUpUserDto);
		const newUser = new this.userModel(user); */
    let parsedData = JSON.parse(signUpUserDto.user);
    const user = await this.setUserBaseData(parsedData);
    let newUser: any = new this.userModel(user);
    newUser.photo = file ? file.path : '';
    console.log('newUser', newUser);
    return await newUser.save(); 
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user ? user : null;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
