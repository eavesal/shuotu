import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useLogin } from '../../../services/auth'
import { UsernameError, PasswordError } from '../../../services/errors'
import { isNotKindOf } from '../../../utils'
import Button, { ButtonApperance, ButtonSize } from '../Button'
import PasswordInputField from '../FormFields/PasswordInputField'

import UsernameInputField from '../FormFields/UsernameInputField'
import FormError from '../Forms/FormError'
import LoginFormFooter from '../LoginFormFooter'

type FormValues = {
  username: string
  password: string
}

interface PasswordLoginFormProps {
  onLoginWithPhoneNumberClicked?: () => void
  onLoginSuccess?: () => void
}

const isFormError = isNotKindOf(UsernameError, PasswordError)

export default function PasswordLoginForm({ onLoginSuccess, onLoginWithPhoneNumberClicked }: PasswordLoginFormProps) {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  const [{ error: loginError, loading: loginLoading }, login] = useLogin()

  const onSubmit = useCallback(
    async (data: FormValues) => {
      await login({
        username: data.username,
        password: data.password,
      })
      onLoginSuccess && onLoginSuccess()
    },
    [onLoginSuccess, login],
  )

  const formError = isFormError(loginError) ? loginError : undefined

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError error={formError} />
        <UsernameInputField
          label="开个大用户名"
          placeholder="输入您的用户名"
          register={register}
          error={loginError instanceof UsernameError ? loginError : undefined}
          fieldError={errors ? errors.username : undefined}
        />
        <PasswordInputField
          label="密码"
          register={register}
          name="password"
          placeholder="输入您的密码"
          error={loginError instanceof PasswordError ? loginError : undefined}
          fieldError={errors ? errors.password : undefined}
        />
        <Button
          style={{ width: '100%' }}
          size={ButtonSize.M}
          apperance={ButtonApperance.PRIMARY}
          type="submit"
          loading={loginLoading}
          enableLoading
        >
          登录
        </Button>
      </form>
      <LoginFormFooter text="忘记密码了？" buttonText="手机号登录" onClick={onLoginWithPhoneNumberClicked} />
    </>
  )
}
