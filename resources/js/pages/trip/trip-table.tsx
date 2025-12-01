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
import { Trip } from '@/types/model';
import { PlusIcon } from 'lucide-react';

import { SearchInput } from '@/components/search-input';
import { ButtonLink } from '@/components/ui/button-link';
import { TableHeadSortable } from '@/components/ui/sortable-head';
import { ItineraryHoverCard } from '@/features/itinerary/itinerary-hover-card';
import { formatLargeNumber } from '@/lib/number';
import trip from '@/routes/trip';
import React from 'react';

interface TripTableProps {
    trips: Trip[];
}

export const TripTable: React.FC<TripTableProps> = ({ trips }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <ButtonLink
                        href={trip.create().url}
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
                        <TableHead>Itinéraire</TableHead>
                        <TableHeadSortable field="fuel_price">
                            Carburant
                        </TableHeadSortable>
                        <TableHeadSortable field="acmi">ACMI</TableHeadSortable>
                        <TableHeadSortable field="net_profit">
                            Bénéfice Net
                        </TableHeadSortable>
                        <TableHead>Heures</TableHead>
                        <TableHead>Créer</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {trips.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <ItineraryHoverCard
                                        itinerary={item.itinerary}
                                    />
                                </TableCell>
                                <TableCell>
                                    {formatLargeNumber(item.fuel_price)}$
                                </TableCell>
                                <TableCell>
                                    {formatLargeNumber(item.acmi)}$
                                </TableCell>
                                <TableCell
                                    className={`${item.net_profit < 0 ? 'text-destructive' : 'text-green-500'}`}
                                >
                                    {formatLargeNumber(item.net_profit)}$
                                </TableCell>
                                <TableCell>{item.duration_hours}</TableCell>
                                <TableCell>{ago(item.created_at)}</TableCell>
                                <TableCell>
                                    <CollectionActionUrl
                                        routeDelete={
                                            trip.destroy({
                                                id: item.id,
                                            }).url
                                        }
                                        routeEdit={
                                            trip.edit({
                                                id: item.id,
                                            }).url
                                        }
                                        routeShow={
                                            trip.show({
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
