/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const env = dotenv.parse(fs.readFileSync(path.resolve(__dirname, `config/${process.env.ENV}`)))

module.exports = {
  env,
  trailingSlash: true,
  webpack: config => {
    config.module.rules.push({
      test: /.*\.stories\.tsx?$/,
      loader: 'ignore-loader',
    })
    return config
  },
}
