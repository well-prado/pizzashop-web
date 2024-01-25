import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('A magic link was sent to your e-mail.', {
        action: {
          label: 'Resend',
          onClick: () => {
            handleSignIn(data)
          },
        },
      })
    } catch (error) {
      toast.error('An error ocurred, please try again later')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">New establishment</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Stay in touch with your sales!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Your e-mail address</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="johndoe@example.com"
                className="border-2 border-solid border-zinc-300"
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Access panel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
