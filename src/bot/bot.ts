import { Telegraf } from 'telegraf'

import { getConfig } from '../config/config'

const config = getConfig('eat_test_')
const bot = new Telegraf('5398276931:AAGyGZmwgqFj4CObZqGwp07GKmvLCdkMcSQ')
bot.start(ctx => ctx.reply('Welcome'))
bot.launch()
