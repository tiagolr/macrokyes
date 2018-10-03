console.log(__dirname)
// ARGS
var program = require('commander')
program
  .name(require('./package.json').name)
  .version(require('./package.json').version, '-v, --version')
  .parse(process.argv)

// SHORTCUTS
const keycodes = require('./keycodes')
const shortcuts = {
  rec: { key: 'f12', alt: false, ctrl: false, meta: false },
  play: { key: 'f11', alt: false, ctrl: false, meta: false },
  parse (str) {
    const split = str.split('+')
    return {
      key: split.pop(),
      altKey: !!split.find(e => e === 'alt'),
      ctrlKey: !!split.find(e => e === 'ctrl'),
      shiftKey: !!split.find(e => e === 'shift'),
      metaKey: !!split.find(e => e === 'meta' || e === 'command')
    }
  },
  compare (s1, s2) {
    return s1.key === s2.key &&
      s1.altKey === s2.altKey &&
      s1.shiftKey === s2.shiftKey &&
      s1.ctrlKey === s2.ctrlKey &&
      s1.metaKey === s2.metaKey
  }
}

// CONFIGS
let logger
let configs = {}
const path = require('path')
const fs = require('fs')
const configFile = process.env.GLOBAL
  ? path.join(__dirname, 'config.json')
  : './config.json'

function readConfigs () {
  configs = JSON.parse(fs.readFileSync(configFile))
  if (logger) {
    logger.level = configs.loglevel.value
    logger.transports[0].silent = configs.nolog.value
    logger.transports[1].silent = configs.noconsole.value
  }
  shortcuts.rec = shortcuts.parse(configs.recShortcut.value)
  shortcuts.play = shortcuts.parse(configs.playShortcut.value)
}

readConfigs()
fs.watch('.', (eventType, filename) => {
  if (configFile.endsWith(filename)) {
    logger.info('config.json file changed')
    try {
      readConfigs()
      logger.info('configs updated')
    } catch (e) {
      logger.info('failed to read configs.json')
    }
  }
})

// LOGGER
const logFile = process.env.GLOBAL
  ? path.join(__dirname, 'output.log')
  : './output.log'

if (fs.existsSync(logFile)) {
  fs.unlinkSync(logFile) // clear logFile when program runs
}

const winston = require('winston')
logger = winston.createLogger({
  level: configs.loglevel.value,
  transports: [
    new winston.transports.File({
      filename: logFile,
      handleExceptions: true,
      silent: configs.nolog.value,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    }),
    new winston.transports.Console({
      silent: configs.noconsole.value, // TODO depend on argv
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      ),
      handleExceptions: true
    })
  ]
})

// INIT
const robot = require('robotjs')
const ioHook = require('iohook')
const notifier = require('node-notifier')

const title = 'MacroKyes'
const recordStart = 'Recording . . .'
const recordStop = 'Record stop'

let keyStrokes = [] // array of detected key presses
let keysPromise = null // promise of keystrokes being played
let isStopping = false // used to cancel keytrokes promise chain
let state = 'IDLE' // [IDLE, PLAY, REC]

ioHook.on('keyup', async e => {
  if (e.meta) {
    e.command = true
  }

  e.key = keycodes[e.keycode]
  logger.debug(`${JSON.stringify(e)}`)
  if (!e.key) {
    return
  }

  if (shortcuts.compare(shortcuts.rec, e)) {
    logger.debug('Rec shortcut')
    await onRecPressed()
  } else if (shortcuts.compare(shortcuts.play, e)) {
    logger.debug('Play shortcut')
    await onPlayPressed()
  } else if (state === 'REC') {
    logger.debug('Push key: ' + e.key)
    e.timestamp = new Date().getTime()
    keyStrokes.push(e)
  }
})

ioHook.start()
logger.info(`logging to ${logFile}`)
logger.info('Listening for keyboard events')

// AUX
async function onRecPressed () {
  if (state === 'PLAY') {
    await stopPlay()
  }

  if (state === 'REC') {
    state = 'IDLE'
    logger.info('RECORD STOP')
    notifier.notify({
      title,
      message: recordStop
    })
  } else {
    logger.info('RECORD START')
    notifier.notify({
      title,
      message: recordStart
    })
    state = 'REC'
    keyStrokes = []
  }
}

async function onPlayPressed () {
  if (state === 'PLAY') {
    await stopPlay()
    return
  }

  if (state === 'REC') {
    logger.info('RECORD STOP')
    state = 'IDLE'
  }

  if (state === 'IDLE') {
    playKeys()
  }
}

function stopPlay () {
  const promise = keysPromise
  isStopping = true
  return promise
    .then(() => new Promise((resolve) => setTimeout(() => resolve()), 100)) // FIX prevent quick record last input
}

async function playKeys () {
  if (!keyStrokes.length) {
    return
  }

  logger.info('PLAY')
  state = 'PLAY'
  let startTime = keyStrokes[0].timestamp

  keysPromise = keyStrokes
    .reduce((chain, e) => chain
      .then(() => (new Promise(resolve => {
        if (isStopping) {
          resolve()
        } else {
          const elapsed = e.timestamp - startTime
          startTime = e.timestamp
          setTimeout(() => {
            pressKey(e)
            resolve()
          }, elapsed)
        }
      }))), Promise.resolve()
    )
    .then(() => {
      logger.info('STOP')
      keysPromise = null
      isStopping = false
      state = 'IDLE'
    })
}

function pressKey (e) {
  if (e.altKey) robot.keyToggle('alt', 'down')
  if (e.ctrlKey) robot.keyToggle('control', 'down')
  if (e.shiftKey) robot.keyToggle('shift', 'down')
  if (e.metaKey) robot.keyToggle('command', 'down')
  robot.keyTap(e.key)
  if (e.altKey) robot.keyToggle('alt', 'up')
  if (e.ctrlKey) robot.keyToggle('control', 'up')
  if (e.shiftKey) robot.keyToggle('shift', 'up')
  if (e.metaKey) robot.keyToggle('command', 'up')
  return false
}
