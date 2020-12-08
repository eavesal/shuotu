module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /.*\.stories\.tsx?$/,
      loader: 'ignore-loader',
    })
    return config
  },
}
