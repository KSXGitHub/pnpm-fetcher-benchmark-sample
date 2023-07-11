#! /usr/bin/env node
const path = require('path')
const process = require('process')
const { spawnSync } = require('child_process')
const members = require('./members.js')
const prepare = require.resolve('./prepare.js')

const nodePath = process.execPath
const hyperfineCommands = members.map(member => path.join(member.destDir, 'run-pnpm-install.sh'))
const hyperfineArguments = [
  '--warmup=3',
  `--prepare=${nodePath} ${prepare}`,
  ...hyperfineCommands
]

const child = spawnSync('hyperfine', hyperfineArguments, {
  cwd: __dirname,
  stdio: 'inherit',
})

if (child.error) {
  console.error(error)
  throw process.exit(1)
}

if (child.status) {
  console.error('hyperfine exited with status', child.status)
  throw process.exit(child.status)
}
