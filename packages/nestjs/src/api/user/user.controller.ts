import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@dataui/crud';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User, UserEntityService } from 'src/entities/user.entity';

import { UserService } from './user.service';

@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    exclude: ['profileRaw'],
  },
  routes: {
    only: ['updateOneBase'],
  },
})
@Controller('user')
export class UserController {
  constructor(public service: UserEntityService, private logic: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  async updateOne(@Req() req, @ParsedRequest() crud_req: CrudRequest, @ParsedBody() dto: User) {
    dto.id = req.user.id;
    return this.service.updateOne(crud_req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req) {
    return this.service.findOne({
      where: { id: req.user.id },
      relations: [],
    });
  }
}
