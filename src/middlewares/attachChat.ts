import { findChat } from '@/models'
import { Context } from 'telegraf'

export async function attachChat(ctx: Context, next: () => void) {
  ctx.dbchat = await findChat(ctx.from.id)
  ctx.setMyCommands([{ command: 'pa', description: 'create sticker with random sed' },
  { command: 'ba', description: 'create bot sticker with random sed' },
  { command: 'ma', description: 'create micah sticker with random sed' },
  { command: 'aa', description: 'create avatar sticker with random sed' }])
  return next()
}
