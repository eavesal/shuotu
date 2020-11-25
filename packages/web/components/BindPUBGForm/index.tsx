import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '../../../context/auth'
import { BindPUBGError } from '../../../services/errors/PubgErrors'
import { useBindPUBGNickname } from '../../../services/pubg/account'
import { isNotKindOf } from '../../../utils'
import Button, { ButtonApperance, ButtonSize } from '../Button'
import InputField from '../FormFields/InputField'
import FormError from '../Forms/FormError'

type FormValues = {
  nickname: string
}

interface BindPUBGFormProps {
  onBindSuccess?: () => void
}

const isFormError = isNotKindOf(BindPUBGError)

export default function BindPUBGForm({ onBindSuccess }: BindPUBGFormProps) {
  const { value: user } = useUser()
  const { handleSubmit, register, errors } = useForm<FormValues>({
    defaultValues: {
      nickname: user ? user.account.pubgNickname : '',
    },
  })
  const [error, bindPUBGAccount] = useBindPUBGNickname()
  const formError = isFormError(error) ? error : undefined

  const onSubmit = useCallback(
    async (data: FormValues) => {
      await bindPUBGAccount(data.nickname)
      onBindSuccess && onBindSuccess()
    },
    [bindPUBGAccount, onBindSuccess],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormError error={formError} />
      <InputField
        type="text"
        name="nickname"
        label="绝地求生昵称"
        placeholder="输入您的绝地求生昵称"
        requiredMsg="输入您的绝地求生昵称"
        register={register}
        error={error instanceof BindPUBGError ? error : undefined}
        fieldError={errors ? errors.nickname : undefined}
        autoFocus
        required
      />
      <Button style={{ width: '100%' }} size={ButtonSize.M} apperance={ButtonApperance.PRIMARY} type="submit">
        绑定
      </Button>
    </form>
  )
}
