import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '../../../context/auth'
import { useUpdateUsername } from '../../../services/auth'
import { UpdateUsernameError } from '../../../services/errors/UpdateUsernameError'
import { isNotKindOf } from '../../../utils'
import Button, { ButtonApperance, ButtonSize } from '../Button'
import UsernameInputField, { USERNAME_MAX_LENGTH } from '../FormFields/UsernameInputField'
import FormError from '../Forms/FormError'

type FormValues = {
  username: string
}

interface UpdateUsernameFormProps {
  onUpdateSuccess?: () => void
}

const isFormError = isNotKindOf(UpdateUsernameError)

export default function UpdateUsernameForm({ onUpdateSuccess }: UpdateUsernameFormProps) {
  const { value: user } = useUser()
  const { handleSubmit, register, errors } = useForm<FormValues>({
    defaultValues: {
      username: user ? user.username.slice(0, USERNAME_MAX_LENGTH) : '',
    },
  })
  const [{ error, loading }, updateUsername] = useUpdateUsername()
  const formError = isFormError(error) ? error : undefined

  const onSubmit = useCallback(
    async (data: FormValues) => {
      await updateUsername(data.username)
      onUpdateSuccess && onUpdateSuccess()
    },
    [updateUsername, onUpdateSuccess],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormError error={formError} />
      <UsernameInputField
        label="新用户名"
        placeholder="输入您的新用户名"
        register={register}
        error={error instanceof UpdateUsernameError ? error : undefined}
        fieldError={errors ? errors.username : undefined}
        autoFocus
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
