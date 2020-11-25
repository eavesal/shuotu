import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdatePassword } from '../../../services/auth'
import { NetworkError, ServerError, UpdatePasswordError } from '../../../services/errors'
import { isNotKindOf } from '../../../utils'
import Button, { ButtonApperance, ButtonSize } from '../Button'
import PasswordInputField from '../FormFields/PasswordInputField'
import FormError from '../Forms/FormError'

type FormValues = {
  password1: string
  password2: string
}

interface UpdatePasswordFormProps {
  onUpdateSuccess?: () => void
}

const isFormError = isNotKindOf(UpdatePasswordError)

export default function UpdatePasswordForm({ onUpdateSuccess }: UpdatePasswordFormProps) {
  const { handleSubmit, register, errors, setError } = useForm<FormValues>({
    defaultValues: {
      password1: '',
      password2: '',
    },
    reValidateMode: 'onSubmit',
  })
  const [{ error: apiError, loading }, updatePassword] = useUpdatePassword()

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (data.password1 !== data.password2) {
        return setError('password2', {
          type: 'manual',
          message: '两次输入密码不一致，请重新输入',
        })
      }
      await updatePassword(data.password1, data.password2)
      onUpdateSuccess && onUpdateSuccess()
    },
    [setError, updatePassword, onUpdateSuccess],
  )

  const formError = isFormError(apiError) ? apiError : undefined

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormError error={formError} />
      {apiError && apiError instanceof ServerError && <p>{apiError.message}</p>}
      {apiError && apiError instanceof NetworkError && <p>{apiError.message}</p>}
      <PasswordInputField
        name="password1"
        label="新密码"
        placeholder="输入您的新密码"
        register={register}
        error={apiError instanceof UpdatePasswordError ? apiError : undefined}
        fieldError={errors ? errors.password1 : undefined}
        autofocus
      />
      <PasswordInputField
        name="password2"
        label="重复新密码"
        placeholder="再次输入您的新密码"
        register={register}
        fieldError={errors ? errors.password2 : undefined}
      />
      <Button
        style={{ width: '100%' }}
        size={ButtonSize.M}
        apperance={ButtonApperance.PRIMARY}
        type="submit"
        loading={loading}
        enableLoading
      >
        确认
      </Button>
    </form>
  )
}
