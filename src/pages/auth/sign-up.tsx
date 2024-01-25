import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data)
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Account created succesfuly.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('An error ocurred, please try again later')
    }
  }

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Sign in to your account</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Become a partner and start selling!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Estabilishment name</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
                placeholder="Your restaurant name"
                className="border-2 border-solid border-zinc-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Your name</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
                placeholder="John Doe"
                className="border-2 border-solid border-zinc-300"
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="phone">Your phone number</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+1 234 567 890"
                className="border-2 border-solid border-zinc-300"
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Create account
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link
                to="/terms-of-service"
                className="underline underline-offset-4"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy-policy"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
