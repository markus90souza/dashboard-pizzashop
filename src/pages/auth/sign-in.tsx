import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({ email: z.string().email() })
type SignInFormData = z.infer<typeof schema>

export const SignIn: FC = () => {
  const [searchParams] = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn })

  const handleSignIn = async ({ email }: SignInFormData) => {
    await authenticate({ email })

    toast.success('Enviamos um link de autenticação para seu e-mail')
  }

  return (
    <>
      <Helmet title="Entrar" />

      <div className="p-8">
        <Button variant={'ghost'} className="absolute right-8 top-8" asChild>
          <Link to={'/sign-up'}>Novo estabelecimento</Link>
        </Button>
        <div className="flex min-w-[350px] flex-col items-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className=" text-2xl font-semibold tracking-tight">
              Acessar painel
            </h2>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="w-full space-y-4 "
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Acessa painel'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
