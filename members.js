const path = require('path')

module.exports = ['old', 'new'].map(name => {
  const ownedAssets = path.join(__dirname, 'owned-assets', name)
  const sharedAssets = path.join(__dirname, 'shared-assets')
  const destDir = path.join(__dirname, 'workspaces', name)
  return { name, ownedAssets, sharedAssets, destDir }
})
