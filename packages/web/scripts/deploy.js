require('dotenv').config()

const glob = require('glob')
const path = require('path')
const qiniu = require('qiniu')
const { replace, find, last } = require('ramda')
const fs = require('fs')
const crypto = require('crypto')

const distFolder = path.resolve(process.cwd(), 'out')
const env = last(process.argv)
const deployTargetToBucket = {
  dev: 'shuotu-dev',
  prod: 'shuotu-prod',
}

const mac = new qiniu.auth.digest.Mac(process.env.QINIU_ACCESS_KEY, process.env.QINIU_SECRET_KEY)
const bucketName = deployTargetToBucket[env]

if (!bucketName) {
  console.log('env parameter is required, which chould be dev,prod')
  process.exit()
}

const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const bucketManager = new qiniu.rs.BucketManager(mac, config)
const putPolicy = new qiniu.rs.PutPolicy({
  scope: bucketName,
})
const uploadToken = putPolicy.uploadToken(mac)

async function lsRemote(manager, name) {
  return new Promise((resolve, reject) => {
    manager.listPrefix(
      name,
      {
        limit: Infinity,
      },
      (err, body, info) => {
        if (err) {
          console.error(err)
          return reject(err)
        }

        if (info.statusCode === 200) {
          return resolve(body.items)
        }

        return reject(err)
      },
    )
  })
}

async function uploadfile(config, token, folder, filename) {
  return new Promise((resolve, reject) => {
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    formUploader.putStream(
      token,
      filename,
      fs.createReadStream(path.resolve(folder, filename)),
      putExtra,
      (err, body, info) => {
        if (err) {
          console.error(err)
          return reject(err)
        }

        if (info.statusCode === 200) {
          return resolve(body)
        }
        return reject(err)
      },
    )
  })
}

async function deleteFiles(manager, name, files) {
  const ops = files.map(x => qiniu.rs.deleteOp(name, x))

  if (!ops.length) {
    return
  }

  return new Promise((resolve, reject) => {
    manager.batch(ops, (err, body, info) => {
      if (err) {
        console.error(err)
        return reject(err)
      }

      if (info.statusCode === 200) {
        return resolve(body)
      }
      return reject(err)
    })
  })
}

function lsLocal(folder) {
  return glob.sync(`${folder}/**/*`, { nodir: true }).map(x => ({
    key: replace(folder + '/', '', x),
    md5: checksum(x),
  }))
}

function checksum(filename) {
  const str = fs.readFileSync(filename, { encoding: 'utf-8' })
  return crypto.createHash('md5').update(str, 'utf8').digest('hex')
}

function isSameFile(a, b) {
  return a.key === b.key && a.md5 === b.md5
}

// in-pure
async function sync() {
  const remoteFiles = await lsRemote(bucketManager, bucketName)
  const localFiles = lsLocal(distFolder)
  const filesToBeDeleted = remoteFiles.filter(remoteFile => !find(localFile => isSameFile(localFile, remoteFile), localFiles))
  const filesToBeUploaded = localFiles.filter(localFile => !find(remoteFile => isSameFile(localFile, remoteFile), remoteFiles))

  await deleteFiles(bucketManager, bucketName, filesToBeDeleted)
  for (let i = 0; i < filesToBeUploaded.length; i++) {
    const file = filesToBeUploaded[i]
    await uploadfile(config, uploadToken, distFolder, file.key)
  }
}

sync()
