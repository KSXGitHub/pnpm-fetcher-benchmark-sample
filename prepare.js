#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
const process = require('process')
const { spawnSync } = require('child_process')
const members = require('./members.js')

function exec(cmd, ...args) {
  console.error(' ->', cmd, ...args)
  const child = spawnSync(cmd, args, {
    cwd: __dirname,
    stdio: 'inherit',
  })
  if (child.error) {
    console.error(child.error)
    throw process.exit(1)
  }
  if (child.status) {
    console.error(`exited with status code ${child.status}`)
    throw process.exit(child.status)
  }
}

function mergeDir(src, dest) {
  const children = fs.readdirSync(src)
  for (const child of children) {
    const childSrc = path.join(src, child)
    const childDest = path.join(dest, child)
    exec('cp', '-r', childSrc, childDest)
  }
}

for (const { name, ownedAssets, sharedAssets, destDir } of members) {
  console.error(`==> ${name}`)
  exec('rm', '-rf', destDir)
  exec('mkdir', '-p', destDir)
  mergeDir(sharedAssets, destDir)
  mergeDir(ownedAssets, destDir)
}
