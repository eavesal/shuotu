import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useLogin, useSendOTP } from '../../../services/auth'
import { OtpCodeError } from '../../../services/errors/OtpCodeError'
import { isNotKindOf } from '../../../utils'
import Button, { ButtonApperance, ButtonSize } from '../Button'
import OptCodeInputField from '../FormFields/OtpCodeInputField'
import PhonenumberInputField from '../FormFields/PhonenumberInputField'
import FormError from '../Forms/FormError'
import LoginFormFooter from '../LoginFormFooter'

type FormValues = {
  phoneNumber: string
  otpCode: string
}

interface OTPLoginFormProps {
  onLoginSuccess?: () => void
  onLoginWithUsernameClicked?: () => void
}

const isFormError = isNotKindOf(OtpCodeError)

export default function OTPLoginForm({ onLoginSuccess, onLoginWithUsernameClicked }: OTPLoginFormProps) {
  const { register, handleSubmit, errors, trigger, getValues } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  const [{ error: otpError, loading: otpLoading }, sendOTP] = useSendOTP()
  const [{ error: loginError, loading: loginLoading }, login] = useLogin()

  const onFetchOptCodeClicked = useCallback(async () => {
    const isValid = await trigger('phoneNumber')
    if (!isValid) {
      return isValid
    }

    await sendOTP(getValues('phoneNumber'))
    return isValid
  }, [trigger, getValues, sendOTP])

  const onSubmit = useCallback(
    async (data: FormValues) => {
      await login({
        phoneNumber: data.phoneNumber,
        otpCode: data.otpCode,
      })
      onLoginSuccess && onLoginSuccess()
    },
    [login, onLoginSuccess],
  )

  const formError = otpError || (isFormError(loginError) ? loginError : undefined)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError error={formError} />
        <PhonenumberInputField
          name="phoneNumber"
          label="手机号（+86）"
          placeholder="输入您的手机号"
          register={register}
          fieldError={errors.phoneNumber}
        />
        <OptCodeInputField
          name="otpCode"
          label="验证码"
          placeholder="输入您的验证码"
          register={register}
          error={loginError instanceof OtpCodeError ? loginError : undefined}
          fieldError={errors.otpCode}
          loading={otpLoading}
          onFetchOptCodeClicked={onFetchOptCodeClicked}
        />
        <Button
          size={ButtonSize.M}
          style={{ width: '100%' }}
          apperance={ButtonApperance.PRIMARY}
          type="submit"
          loading={loginLoading}
          enableLoading
        >
          登录/注册
        </Button>
        <p>注册即表示您同意我们的使用条款和隐私政策</p>
      </form>
      <LoginFormFooter text="已经注册过了？" buttonText="账号密码登录" onClick={onLoginWithUsernameClicked} />
    </>
  )
}
