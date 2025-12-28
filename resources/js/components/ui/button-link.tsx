import { ComponentProps, FC } from 'react';
import { Button, buttonVariants } from './button';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

type Props = ComponentProps<typeof Button> & {href?: string, native?: boolean};


export const ButtonLink: FC<Props> = ({ href = '#', native = false, children, size = 'sm', variant, className, ...props}) => {

  if (native) {
    return <a href={href} className={cn(buttonVariants({ className, size, variant }))} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  }
return <Button {...props} className={className} size={size} variant={variant} asChild>
      <Link href={href} target={native ? '_blank' : undefined}>
      {children}
      </Link>
  </Button>
};