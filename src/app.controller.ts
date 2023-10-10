import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ListUrl } from './use-cases/list-url';
import { GetUrl } from './use-cases/get-url';
import { RegisterShortUrl } from './use-cases/register-short-url';
import { ShortUrlValidator } from './validators/short-url.validator';
import { DeleteUrl } from './use-cases/delete-url';

@Controller()
export class AppController {
  constructor(
    private readonly listUrl: ListUrl,
    private readonly getUrl: GetUrl,
    private readonly registerShortUrl: RegisterShortUrl,
    private readonly deleteUrl: DeleteUrl,
  ) {}

  @Get()
  getHello() {
    return this.listUrl.findAll();
  }

  @Get(':code')
  async getOneUrl(@Param('code') code: string, @Res() res) {
    const url = await this.getUrl.execute(code);
    return res.redirect(url.longUrl);
  }

  @Post()
  registerUrl(@Body() body: ShortUrlValidator) {
    return this.registerShortUrl.execute(body.longUrl, body.title);
  }

  @Delete(':code')
  async removeUrl(@Param('code') code: string, @Res() res) {
    await this.deleteUrl.execute(code);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
