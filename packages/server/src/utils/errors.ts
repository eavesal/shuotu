import { AuthenticationError } from 'apollo-server'

export function gqlAuthError() {
  return new AuthenticationError('您没有权限访问该资源')
}
