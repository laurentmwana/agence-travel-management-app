import { CollectionActionUrl } from '@/components/collection-action';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import React from 'react';

import { SearchInput } from '@/components/search-input';
import { SelectGenerate } from '@/components/ui/select-generate';
import { TableHeadSortable } from '@/components/ui/sortable-head';
import { useFetch } from '@/hooks/use-fetch';
import { useParams } from '@/hooks/use-params';
import json from '@/routes/json';
import trip from '@/routes/trip';
import { Itinerary, Trip } from '@/types/model';
import { router } from '@inertiajs/react';
import { getItineraryTypeIcon } from '../itinerary';
import { ItineraryHoverCard } from '../itinerary/itinerary-hover-card';
import { formatLargeNumber } from '@/lib/number';

interface TripStatTableProps {
    trips: Trip[];
    defaultItinerary: string;
}

export const TripStatTable: React.FC<TripStatTableProps> = ({
    trips,
    defaultItinerary,
}) => {
    const fetchItineraries = useFetch<{ data: Itinerary[] }>(
        json.itinerary.index().url,
    );
    const { mergeParams } = useParams();

    const getRouteFilterByItinerary = (itinerary: string) =>
        mergeParams(window.location.pathname, {
            itinerary: itinerary,
        });

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <SearchInput />
                <SelectGenerate
                    className="md:max-w-xl"
                    value={defaultItinerary}
                    isPending={fetchItineraries.isPending}
                    placeholder="Itinéraires"
                    onChange={(v) => router.visit(getRouteFilterByItinerary(v))}
                    options={
                        fetchItineraries.fetchData?.data.map((item) => {
                            const IconType = getItineraryTypeIcon(item.type);
                            return {
                                value: item.id,
                                name: (
                                    <div className="flex items-center gap-2">
                                        <IconType size={14} />
                                        <p>
                                            {item.start.name} - {item.end.name}
                                        </p>
                                    </div>
                                ),
                                selected: item.id === defaultItinerary,
                            };
                        }) ?? []
                    }
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Itinéraire</TableHead>
                        <TableHeadSortable field="net_profit">
                            Net Recette
                        </TableHeadSortable>
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
                                <TableCell
                                    className={`${item.net_profit < 0 ? 'text-destructive' : 'text-green-500'}`}
                                >
                                    {formatLargeNumber(item.net_profit)} Fc
                                </TableCell>
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
