import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { InfoIcon, PenIcon, TrashIcon } from 'lucide-react';
import { FC, useState } from 'react';
import { ConfirmationPassword } from './confirmation-password';
import { Button } from './ui/button';

type CollectionActionUrlProps = {
    className?: string;
    routeEdit?: string;
    routeShow?: string;
    routeDelete?: string;
};

export const CollectionActionUrl: FC<CollectionActionUrlProps> = ({
    routeDelete,
    routeEdit,
    routeShow,
    className,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(className, 'flex items-center gap-2 md:justify-end')}
        >
            {routeEdit && (
                <Button size="sm" variant="ghost" asChild>
                    <Link href={routeEdit}>
                        <PenIcon size={14} />
                    </Link>
                </Button>
            )}

            {routeShow && (
                <Button size="sm" variant="ghost" asChild>
                    <Link href={routeShow}>
                        <InfoIcon size={14} />
                    </Link>
                </Button>
            )}

            {routeDelete && (
                <>
                    <Button
                        onClick={() => setOpen(true)}
                        size="sm"
                        variant="outline-destructive"
                    >
                        <TrashIcon size={14} />
                    </Button>

                    <ConfirmationPassword
                        open={open}
                        setOpen={setOpen}
                        url={routeDelete}
                    />
                </>
            )}
        </div>
    );
};





type CollectionActionClickableProps = {
    className?: string;
    onRouteEdit?: () => void;
    onRouteShow?: () => void;
    routeDelete?: string;
};

export const CollectionActionClickable: FC<CollectionActionClickableProps> = ({
    onRouteEdit,
    onRouteShow,
    routeDelete,
    className,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(className, 'flex items-center gap-2 md:justify-end')}
        >
            {onRouteEdit && (
                <Button size="sm" variant="ghost" onClick={() => onRouteEdit()}>
                    <PenIcon size={14} />
                </Button>
            )}

            {onRouteShow && (
                <Button size="sm" variant="ghost" onClick={() => onRouteShow()}>
                    <InfoIcon size={14} />
                </Button>
            )}

            {routeDelete && (
                <>
                    <Button
                        onClick={() => setOpen(true)}
                        size="sm"
                        variant="outline-destructive"
                    >
                        <TrashIcon size={14} />
                    </Button>

                    <ConfirmationPassword
                        open={open}
                        setOpen={setOpen}
                        url={routeDelete}
                    />
                </>
            )}
        </div>
    );
};
