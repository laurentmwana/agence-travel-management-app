import { ComponentProps, FC } from 'react';
import { Button } from './button';
import { Loader2Icon } from 'lucide-react';

type Props = ComponentProps<typeof Button> & {loader?: boolean}

export const ButtonLoader: FC<Props> = ({ loader = false, children, ...props}) => {
  return <Button {...props}>
    {loader ? <Loader2Icon size={14} className='animate-spin' /> : null}
    {children}
  </Button>
};