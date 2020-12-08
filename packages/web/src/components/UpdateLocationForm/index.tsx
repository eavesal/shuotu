import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Button, { ButtonApperance, ButtonSize } from '../Button'
import { MapLocation } from '../../types/index'
import InputField from '../FormFields/InputField'

import styles from './index.module.scss'
import PointInputField from '../FormFields/PointInputField'
import { Point } from '../Map/types'
import LocationSelectField from '../FormFields/LocationSelectField'

type FormValues = {
  pos: {
    value: string
  }[]
  label: string
  parentId: string
}

interface UpdateLocationFormProps {
  location: MapLocation
  locations: MapLocation[]
  onChange?(id: string, data: Partial<MapLocation>): void
  onConfirm?(): void
  onDelete?(id: string): void
}

export default function UpdateLocationForm({ location, locations, onChange, onConfirm, onDelete }: UpdateLocationFormProps) {
  const { id } = location
  const defaultValues = useMemo(
    () => ({
      pos: location.pos.map(x => ({ value: x.toString() })),
      label: location.label,
      parentId: location.parentId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  )
  const { errors, handleSubmit, register, control } = useForm<FormValues>({
    defaultValues: defaultValues,
    reValidateMode: 'onSubmit',
  })

  const { label, pos, parentId } = useWatch({
    control,
    name: ['label', 'pos', 'parentId'],
    defaultValue: defaultValues,
  })

  useEffect(() => {
    label &&
      onChange &&
      onChange(id, {
        label,
        pos: pos.map(x => parseFloat(x.value)) as Point,
        parentId,
      })
  }, [id, label, pos, parentId, onChange])

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (data.label) {
        onChange &&
          onChange(id, {
            label: data.label,
            pos: data.pos.map(x => parseFloat(x.value)) as Point,
            parentId: data.parentId,
          })
        onConfirm && onConfirm()
      } else {
        onDelete && onDelete(id)
      }
    },
    [id, onChange, onConfirm, onDelete],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <PointInputField name="pos" label="坐标:" register={register} control={control} />
      <InputField
        type="text"
        name="label"
        label="地名:"
        placeholder="请输入地名"
        requiredMsg="请输入地名"
        register={register}
        fieldError={errors ? errors.label : undefined}
        required
      />
      <LocationSelectField name="parentId" label="所属区域" activeId={id} options={locations} control={control} />
      <div className={styles.btns}>
        <Button size={ButtonSize.S} apperance={ButtonApperance.TERTIARY} type="reset" onClick={() => onDelete(id)}>
          删除
        </Button>
        <Button size={ButtonSize.S} apperance={ButtonApperance.PRIMARY} type="submit">
          确认
        </Button>
      </div>
    </form>
  )
}
