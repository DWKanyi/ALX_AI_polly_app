'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createPollSchema, type CreatePollInput } from '@/lib/validations/poll'
import { createPoll } from '@/lib/api'
import { toast } from 'sonner'

export default function CreatePollForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<CreatePollInput>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      title: '',
      description: '',
      isMultiple: false,
      expiresAt: undefined,
      options: [{ label: '' }, { label: '' }],
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: CreatePollInput) => {
    setSubmitError(null)
    try {
      await createPoll(values)
      form.reset()
      toast.success('Poll created successfully!')
      router.push('/polls')
    } catch (e: any) {
      setSubmitError(e?.message || 'Failed to create poll')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }: { field: ControllerRenderProps<CreatePollInput, "title"> }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <input
                  type="text"
                  placeholder="e.g., What should we build next?"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: ControllerRenderProps<CreatePollInput, "description"> }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Optional details..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  rows={3}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="isMultiple"
            render={({ field }: { field: ControllerRenderProps<CreatePollInput, "isMultiple"> }) => (
              <FormItem>
                <FormLabel>Allow multiple selections</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    disabled={isSubmitting}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }: { field: ControllerRenderProps<CreatePollInput, "expiresAt"> }) => (
              <FormItem>
                <FormLabel>Expires at (optional)</FormLabel>
                <FormControl>
                  <input
                    type="datetime-local"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    disabled={isSubmitting}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel>Options</FormLabel>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ label: '' })}
              disabled={isSubmitting || fields.length >= 10}
            >
              Add option
            </Button>
          </div>

          {fields.map((field: { id: Key | null | undefined }, index: number) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`options.${index}.label` as const}
                render={({ field }: { field: ControllerRenderProps<CreatePollInput, `options.${number}.label`> }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                disabled={isSubmitting || fields.length <= 2}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Poll'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}


