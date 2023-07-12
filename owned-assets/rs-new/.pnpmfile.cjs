const { fetchTarball } = require('/home/khai/programming/pnpm-tarball-fetcher-rs-new')

module.exports = {
  hooks: {
    fetchers: {
      remoteTarball: ({ defaultFetchers }) => {
        return async (cafs, resolution, opts) => {
          // console.log('fetching', resolution.tarball)
          const filesIndex = await fetchTarball(resolution.tarball, resolution.integrity)
          // console.log('done fetching', resolution.tarball)
          return { filesIndex, local: true }
        }
      }
    }
  }
}
