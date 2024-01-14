import { FC } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

type NavLinkProps = LinkProps

export const NavLink: FC<NavLinkProps> = ({ className, ...rest }) => {
  const { pathname } = useLocation()
  return (
    <Link
      data-current={pathname === rest.to}
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-muted data-[current=true]:text-foreground',
        className,
      )}
      {...rest}
    />
  )
}
