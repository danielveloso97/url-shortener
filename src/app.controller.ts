import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ListUrl } from './use-cases/list-url';
import { GetUrl } from './use-cases/get-url';
import { RegisterShortUrl } from './use-cases/register-short-url';
import { ShortUrlValidator } from './validators/short-url.validator';

@Controller()
export class AppController {
  constructor(
    private readonly listUrl: ListUrl,
    private readonly getUrl: GetUrl,
    private readonly registerShortUrl: RegisterShortUrl,
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
}
