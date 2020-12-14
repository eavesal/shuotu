import csvdb from 'csv-database'

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type CSVDBType = ThenArg<ReturnType<typeof csvdb>>

export type GlobalEnvVars = {
  MYSQL_DB_DATABASE: string
  MYSQL_DB_HOST: string
  MYSQL_DB_PORT: string
  MYSQL_DB_USERNAME: string
  MYSQL_DB_PASSWORD: string
  JWT_SECRET_KEY: string
}