import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
})
type SignUpFormData = z.infer<typeof schema>

export const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>()

  const navigate = useNavigate()

  const { mutateAsync: createRestaurant } = useMutation({
    mutationFn: registerRestaurant,
  })

  const handleSignUp = async (data: SignUpFormData) => {
    await createRestaurant({
      restaurantName: data.restaurantName,
      managerName: data.managerName,
      email: data.email,
      phone: data.phone,
    })

    try {
      toast.success('Estabelecimento cadastrado com sucesso', {
        action: {
          label: 'Acessar painel',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar estabelecimento')
    }
  }

  return (
    <>
      <Helmet title="Cadastrar" />

      <div className="p-8">
        <div className="flex min-w-[350px] flex-col items-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className=" text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h2>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full space-y-4 "
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                type="text"
                id="restaurantName"
                {...register('restaurantName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                type="text"
                id="managerName"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input type="tel" id="phone" {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Finalizar cadastro'
              )}
            </Button>
          </form>

          <p className="max-w-sm px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar você concorda com nossos{' '}
            <Link className="underline underline-offset-4" to={'#'}>
              termos de serviços
            </Link>{' '}
            e{' '}
            <Link className="underline underline-offset-4" to={'#'}>
              politicas de privacidade
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
