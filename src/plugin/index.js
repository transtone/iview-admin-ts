import config from '@/config'
const { plugin } = config

export default Vue => {
  for (const name of Object.keys(plugin)) {
    const value = plugin[name]
    Vue.use(
      require(`./${name}`).default,
      typeof value === 'object' ? value : undefined
    )
  }
}
