import { CollectionActionUrl } from '@/components/collection-action';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ago } from '@/lib/date';
import { Itinerary } from '@/types/model';
import { PlusIcon } from 'lucide-react';

import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { TableHeadSortable } from '@/components/ui/sortable-head';
import { DestinationHoverCard } from '@/features/destination/destination-hover-card';
import { getItineraryTypeIcon } from '@/features/itinerary';
import { numberToFixed } from '@/lib/number';
import itinerary from '@/routes/itinerary';
import React from 'react';

interface ItineraryTableProps {
    itineraries: Itinerary[];
}

export const ItineraryTable: React.FC<ItineraryTableProps> = ({
    itineraries,
}) => {
    const [openFormUpdateModalId, setOpenFormUpdateModalId] = React.useState<
        string | null
    >(null);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <ButtonLink
                        href={itinerary.create().url}
                        size="sm"
                        variant="ghost"
                    >
                        <PlusIcon size={15} />
                    </ButtonLink>
                </div>

                <SearchInput />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Départ</TableHead>
                        <TableHead>Arriver</TableHead>
                        <TableHeadSortable field="type">Type</TableHeadSortable>
                        <TableHeadSortable field="distance_km">
                            Distance
                        </TableHeadSortable>
                        <TableHeadSortable field="price_per_seat">
                            Prix
                        </TableHeadSortable>
                        <TableHeadSortable field="is_scheduled">
                            Programmer
                        </TableHeadSortable>
                        <TableHead>Créer</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {itineraries.map((item) => {
                        const IconType = getItineraryTypeIcon(item.type);
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <DestinationHoverCard
                                        destination={item.start}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DestinationHoverCard
                                        destination={item.end}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <IconType size={15} />
                                        <span>{item.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {numberToFixed(item.distance_km, 3)} km
                                </TableCell>
                                <TableCell>{item.price_per_seat}$</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            item.is_scheduled
                                                ? 'secondary'
                                                : 'destructive'
                                        }
                                    >
                                        {item.is_scheduled ? 'Oui' : 'Non'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{ago(item.created_at)}</TableCell>
                                <TableCell>
                                    <CollectionActionUrl
                                        routeDelete={
                                            itinerary.destroy({
                                                id: item.id,
                                            }).url
                                        }
                                        routeEdit={
                                            itinerary.edit({
                                                id: item.id,
                                            }).url
                                        }
                                        routeShow={
                                            itinerary.show({
                                                id: item.id,
                                            }).url
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
