import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors ,UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { editFileName, imageFileFilter } from '../../utils/file-upload.utils';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: editFileName,

      }),
      fileFilter: imageFileFilter,

    }),
  )
  
  signUpUser(
    @Body() signUpUserDto: CreateUserDto,
    @UploadedFile() file,
  ): Promise<any> {
    return this.userService.signUpUser(signUpUserDto, file);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

