const fs = require('fs')
const os = require('os')
const execSync = require('child_process').execSync
const del = require('del')

const nodeVersion = Number(process.version.match(/^v(\d+\.)/)[1])
const arch = os.arch()
let platform = process.platform
if (platform === 'win32') platform = 'windows'
if (platform === 'darwin') platform = 'macos'

const target = `node${nodeVersion}-${platform}-${arch}`
console.log(`Building for: ${target}`)

// build
const dir = `./dist/${target}`
const filename = 'MacroKyes'
del.sync(`${dir}/**`)
execSync(`pkg index.js --targets ${target} --output ${dir}/${filename}`, { stdio: [0, 1, 2] })
console.log()

fs.copyFileSync('./node_modules/robotjs/build/Release/robotjs.node', `${dir}/robotjs.node`)
console.log('copied robotjs.node')

const ioHookBuild = `node-v${process.versions.modules}-${process.platform}-${process.arch}`
fs.copyFileSync(`./node_modules/iohook/builds/${ioHookBuild}/build/Release/iohook.node`, `${dir}/iohook.node`)
console.log('copied iohook.node')
