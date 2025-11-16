'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Send } from 'lucide-react'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { DefaultDocumentIDType } from 'payload'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  FormBlockType & {
    id?: DefaultDocumentIDType
  }
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-6 lg:mb-8" data={introContent} enableGutter={false} />
        )}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Liên hệ với chúng tôi</h1>
            <p className="text-slate-600">Điền vào biểu mẫu dưới đây và chúng tôi sẽ quay lại liên hệ với bạn trong thời gian sớm nhất.</p>
          </div>

          <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <RichText data={confirmationMessage} />
            </div>
          )}
          {isLoading && !hasSubmitted && (
            <div className="text-center py-6">
              <div className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent"></div>
                <span className="text-gray-700 font-medium text-sm">Đang gửi...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-4">
              <div className="text-red-700 font-medium text-sm">
                Lỗi: {error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.'}
              </div>
            </div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              {formFromProps?.fields?.map((field, index) => {
                const Field: React.FC<any> | undefined =
                  fields?.[field.blockType as keyof typeof fields]

                if (Field) {
                  return (
                    <Field
                      key={index}
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                      control={formMethods.control}
                      errors={errors}
                      register={register}
                    />
                  )
                }
                return null
              })}
            </div>

              <div className="text-center pt-3">
                <Button
                  form={formID}
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
