import { findUser } from '@/models'
import { Context } from 'telegraf'

export async function attachUser(ctx: Context, next: () => void) {
  ctx.dbuser = await findUser(ctx.from.id)
  ctx.setMyCommands([{command:'pa', description: 'create sticker with random sed'},
  {command:'ba', description: 'create bot sticker with random sed'},
  {command:'ma', description: 'create micah sticker with random sed'},
  {command:'aa', description: 'create avatar sticker with random sed'}])
  return next()
}
