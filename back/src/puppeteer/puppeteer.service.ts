import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts } from '../entities/carts.entity';
import puppeteer from 'puppeteer';
@Injectable()
export class PuppeteerService {
  constructor(
  ) { }

  async play() {
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 0,
      });
      const page = await browser.newPage();
      await page.goto('http://localhost:3060/');
      await page.waitForSelector(".sign-in__button")
      await page.click(".sign-in__button");
      await page.waitForSelector("form input:nth-child(1)");
      await page.type("form input:nth-child(1)", 'admin', { delay: 0 });
      await page.waitForSelector("form input:nth-child(2)");
      await page.type("form input:nth-child(2)", '1', { delay: 0 })
      await page.waitForSelector(".signin-form__buttons button:nth-child(2)");
      await page.click(".signin-form__buttons button:nth-child(2)");
      await browser.close();
      // await page.screenshot({ path: 'uploads/naverSports.png' });
    })();
  }


}
