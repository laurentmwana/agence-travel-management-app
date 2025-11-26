import { ComponentProps, FC } from 'react';
import { TableHead } from './table';
import { router, usePage } from '@inertiajs/react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { queryParamsSortable } from '@/lib/queries';
import { QueriesProps } from '@/types';

type TableHeadSortableProps = ComponentProps<typeof TableHead> & {field: string}

export const TableHeadSortable: FC<TableHeadSortableProps> = ({field, className, children, ...props}) => {
    const query = usePage<QueriesProps>().props.query

    const isActive = field === query?.sort

    const direction = query?.dir ?? 'desc' 

    const handleSort = () => {
        const url = queryParamsSortable(isActive, direction, field).toString()

        router.visit(url.toString())
    }

    const getSortIcon = () => {
        if (!isActive) {
            return <ArrowUpDownIcon className='opacity-50' size={14} />
        }

        if (direction === 'asc') {
            return <ArrowUpIcon className='text-primary' size={14} />
        }
        return <ArrowDownIcon className='text-primary' size={14} />
    }

  return <TableHead {...props} onClick={handleSort} className={cn(className, 'cursor-pointer')}>
    <div className={cn('flex items-center gap-2 hover:text-foreground')}>
        {children}
        {getSortIcon()}
    </div>
  </TableHead>
};
