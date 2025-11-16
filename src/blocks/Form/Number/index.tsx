import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { capitaliseFirstLetter } from '@/utilities/capitaliseFirstLetter'
export const Number: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <FormItem>
        <Label
          htmlFor={name}
          className="text-base font-semibold text-gray-900 mb-2 block text-left font-sans"
        >
          {label}
          {requiredFromProps && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="relative">
          <Input
            defaultValue={defaultValue}
            id={name}
            type="number"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            {...register(name, {
              required: requiredFromProps
                ? `${capitaliseFirstLetter(label || name)} is required.`
                : undefined,
            })}
          />
        </div>
        {errors?.[name]?.message && typeof errors?.[name]?.message === 'string' && (
          <div className="mt-2 text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {errors?.[name]?.message}
          </div>
        )}
      </FormItem>
    </Width>
  )
}
