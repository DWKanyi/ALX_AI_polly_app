"use client"

import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PollVotePage() {
  const params = useParams<{ id: string }>()
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Mock poll data (replace with real fetch later)
  const poll = useMemo(
    () => ({
      id: params?.id ?? 'mock-id',
      title: 'What feature should we build next?',
      description: 'Pick the option you like the most.',
      isMultiple: false,
      options: [
        { id: 'opt-1', label: 'Dark mode' },
        { id: 'opt-2', label: 'Mobile app' },
        { id: 'opt-3', label: 'Offline support' },
      ],
    }),
    [params?.id]
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOptionId) return
    // Simulate submit (replace with /api/polls/[id]/vote later)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Thanks for voting!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your vote has been recorded. Results placeholder coming soon.
            </p>
            <div className="text-sm">
              Selected option: <strong>{poll.options.find(o => o.id === selectedOptionId)?.label}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>{poll.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {poll.description && (
            <p className="text-sm text-muted-foreground mb-4">{poll.description}</p>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              {poll.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="option"
                    value={opt.id}
                    checked={selectedOptionId === opt.id}
                    onChange={() => setSelectedOptionId(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <Button type="submit" disabled={!selectedOptionId}>
              Submit vote
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


