import { Context } from 'telegraf'
import { createAvatar } from '@dicebear/avatars';
// import * as style from '@dicebear/micah';
// import * as style from '@dicebear/avatars-avataaars-sprites';
import * as stylebots from '@dicebear/avatars-bottts-sprites';
import * as styleavataars from '@dicebear/avatars-avataaars-sprites';
import * as stylefemale from '@dicebear/avatars-female-sprites';
import * as stylemale from '@dicebear/avatars-male-sprites';
import * as stylehuman from '@dicebear/avatars-human-sprites';
import * as stylemicah from '@dicebear/micah';
import * as stylegridy from '@dicebear/avatars-gridy-sprites'
import Canvg from 'canvg';
import { InlineQueryResult } from 'typegram';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const sharp = require('sharp');

var fs = require('fs');
const util = require('util')


const writeFile = util.promisify(fs.writeFile);

export async function generatePA(ctx: Context) {
  if ('text' in ctx.message) {

    ctx.setMyCommands([{ command: 'pa', description: 'create sticker with random sed' },
    { command: 'ba', description: 'create bot sticker with random sed' },
    { command: 'ma', description: 'create male sticker with random sed' },
    { command: 'fa', description: 'create female sticker with random sed' }])
    let svg = await generateART(ctx.message.text)

    ctx.replyWithSticker({ source: svg });
  }
}
export async function generatePABots(ctx: Context) {
  if ('text' in ctx.message) {
    let svg = await generateART(ctx.message.text, 0)

    ctx.replyWithSticker({ source: svg });
  }
}


export async function generatePAAvatar(ctx: Context) {
  if ('text' in ctx.message) {
    let svg = await generateART(ctx.message.text, 1)

    ctx.replyWithSticker({ source: svg });
  }
}

export async function generatePAMicah(ctx: Context) {
  if ('text' in ctx.message) {
    let svg = await generateART(ctx.message.text, 5)

    ctx.replyWithSticker({ source: svg });
  }
}

export async function generatePAQ(ctx: Context) {
  //   console.log(ctx.inlineQuery.query)
  //   let svg = await generateART(ctx.inlineQuery.query)
  //   let vals : InlineQueryResult[] = [{type: "photo",id:"1",photo_file_id: svg}]
  //   ctx.answerInlineQuery(vals)
  //   ctx.telegram.sendPhoto(
  // // }
  // //   ctx.answerInlineQuery(
}

async function generateART(text, index = -1) {
  let styles = [stylebots, styleavataars, stylefemale, stylemale, stylehuman, stylemicah, stylegridy]
  let msg_arr = text.split(" ")
  msg_arr = msg_arr.slice(1, msg_arr.length)
  let msg = msg_arr.join(' ')
  let svg = undefined

  if (index < 0) {
    let ind = Math.floor(Math.random() * styles.length)
    svg = createAvatar(styles[ind], {
      seed: msg,
      height: 250,
      width: 250
    });
  } else {
    svg = createAvatar(styles[index], {
      seed: msg,
      height: 250,
      width: 250
    });
  }

  try {
    svg = await sharp(Buffer.from(svg.toString())).png().toBuffer()
  }
  catch (err) {
    console.log(err);
  }
  return svg
}