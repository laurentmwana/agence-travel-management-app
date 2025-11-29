import { formatDate } from '@/lib/date';
import { formatCurrency } from '@/lib/number';
import type { Trip } from '@/types/model';
import {
    Calendar,
    DollarSign,
    FileText,
    Fuel,
    MapPin,
    PieChart,
    Receipt,
} from 'lucide-react';
import type React from 'react';
import { getItineraryTypeIcon } from '../itinerary';

interface TripDetailsProps {
    trip: Trip;
}

export const TripDetails: React.FC<TripDetailsProps> = ({ trip }) => {
    const IconType = getItineraryTypeIcon(trip.itinerary.type);

    return (
        <div className="space-y-6">
            {/* En-tête principale */}
            <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-lg bg-muted p-3">
                            <IconType size={32} />
                        </div>
                        <div>
                            <h1 className="text-base font-bold">
                                {trip.itinerary.start.name} →
                                {trip.itinerary.end.name}
                            </h1>
                            <p className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>{formatDate(trip.perfomed_at)}</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                            Distance
                        </div>
                        <div className="text-sm font-bold">
                            {trip.itinerary.distance_km} km
                        </div>
                    </div>
                </div>
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Colonne de gauche - Informations financières */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Carte des indicateurs financiers */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <DollarSign size={20} className="mr-2" />
                            Performances financières
                        </h2>
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                            <div className="rounded-lg border bg-muted/50 p-4 text-center">
                                <div className="mb-1 text-sm font-medium text-muted-foreground">
                                    Revenu
                                </div>
                                <div className="font-bold">
                                    {formatCurrency(trip.revenue)}
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/50 p-4 text-center">
                                <div className="mb-1 text-sm font-medium text-muted-foreground">
                                    Coût total
                                </div>
                                <div className="font-bold">
                                    {formatCurrency(trip.total_cost)}
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/50 p-4 text-center">
                                <div className="mb-1 text-sm font-medium text-muted-foreground">
                                    Profit net
                                </div>
                                <div className="font-bold">
                                    {formatCurrency(trip.net_profit)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Détails des dépenses */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <PieChart size={20} className="mr-2" />
                            Détail des dépenses
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                                <div className="flex items-center space-x-3">
                                    <Fuel size={20} />
                                    <span className="font-medium">
                                        Coût carburant
                                    </span>
                                </div>
                                <span className="font-bold">
                                    {formatCurrency(trip.fuel_cost)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                                <div className="flex items-center space-x-3">
                                    <Receipt size={20} />
                                    <span className="font-medium">
                                        Autres dépenses
                                    </span>
                                </div>
                                <span className="font-bold">
                                    {formatCurrency(trip.other_expenses)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colonne de droite - Informations du trajet */}
                <div className="space-y-6">
                    {/* Informations de l'itinéraire */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <MapPin size={20} className="mr-2" />
                            Détails du trajet
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Type de transport
                                </span>
                                <span className="font-medium capitalize">
                                    {trip.itinerary.type}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Sièges disponibles
                                </span>
                                <span className="font-medium">
                                    {trip.itinerary.available_seats}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Prix par siège
                                </span>
                                <span className="font-medium">
                                    ${trip.itinerary.price_per_seat}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Programmé
                                </span>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                        trip.itinerary.is_scheduled === '1'
                                            ? 'bg-muted text-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    {trip.itinerary.is_scheduled
                                        ? 'Oui'
                                        : 'Non'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Observation */}
                    {trip.observation && (
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-3 flex items-center text-lg font-semibold">
                                <FileText size={20} className="mr-2" />
                                Observation
                            </h2>
                            <p className="rounded-lg border bg-muted/50 p-4 text-sm">
                                {trip.observation}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
