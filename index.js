const Log = console.log
const robot = require('robotjs')
const ioHook = require('iohook')
const notifier = require('node-notifier')
const keycodes = require('./keycodes')

const title = 'MacroKyes'
const recordStart = 'Recording . . .'
const recordStop = 'Ready'

let shortcuts = {
  toggleRec: 88,
  play: 87
}

let keyStrokes = [] // array of detected key presses
let keysPromise = null // promise of keystrokes being played
let isStopping = false // used to cancel keytrokes promise chain
let state = 'IDLE' // [IDLE, PLAY, REC]

ioHook.on('keyup', async e => {
  if (e.meta) {
    e.command = true
  }

  e.key = keycodes[e.keycode]
  if (!e.key) {
    return
  }

  if (shortcuts.toggleRec === e.keycode) {
    await onRecPressed()
  } else if (shortcuts.play === e.keycode) {
    await onPlayPressed()
  } else if (state === 'REC') {
    e.timestamp = new Date().getTime()
    keyStrokes.push(e)
  }
})

async function onRecPressed () {
  if (state === 'PLAY') {
    await stopPlay()
  }

  if (state === 'REC') {
    state = 'IDLE'
    Log('RECORD STOP')
    notifier.notify({
      title,
      message: recordStop
    })
  } else {
    Log('RECORD START')
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
    Log('RECORD STOP')
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

  Log('PLAY')
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
      Log('STOP PROMISE')
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

ioHook.start()
