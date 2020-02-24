declare module 'app.config.json' {
  interface ConfigType {
    targets: Array<string>
  }

  const config: ConfigType

  export default config
}
