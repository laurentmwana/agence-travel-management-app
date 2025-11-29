import { Itinerary } from '@/types/model';
import { Calendar, DollarSign, FileText, MapPin, Users } from 'lucide-react';
import React from 'react';
import { getItineraryTypeIcon } from '.';

interface ItineraryDetailsProps {
    itinerary: Itinerary;
}

export const ItineraryDetails: React.FC<ItineraryDetailsProps> = ({
    itinerary,
}) => {
    const IconType = getItineraryTypeIcon(itinerary.type);

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
                                {itinerary.start.name} → {itinerary.end.name}
                            </h1>
                            <p className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin size={16} />
                                <span>Itinéraire {itinerary.type}</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                            Distance
                        </div>
                        <div className="text-sm font-bold">
                            {itinerary.distance_km} km
                        </div>
                    </div>
                </div>
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Informations principales */}
                <div className="space-y-6">
                    {/* Détails du trajet */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <MapPin size={20} className="mr-2" />
                            Informations du trajet
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Type de transport
                                </span>
                                <div className="flex items-center space-x-2">
                                    <IconType size={16} />
                                    <span className="font-medium capitalize">
                                        {itinerary.type}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Statut
                                </span>
                                <span
                                    className={`FC { itinerary.is_scheduled === '1' ? 'bg-muted text-foreground' : 'bg-muted text-muted-foreground' } rounded-full px-2 py-1 text-xs font-medium`}
                                >
                                    {itinerary.is_scheduled === '1'
                                        ? 'Programmé'
                                        : 'Non programmé'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Distance
                                </span>
                                <span className="font-medium">
                                    {itinerary.distance_km} km
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Informations de prix */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <DollarSign size={20} className="mr-2" />
                            Tarification
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Prix par siège
                                </span>
                                <span className="font-medium">
                                    FC {itinerary.price_per_seat}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Prix par personne
                                </span>
                                <span className="font-medium">
                                    FC {itinerary.price_per_person}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colonne de droite */}
                <div className="space-y-6">
                    {/* Capacité */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <Users size={20} className="mr-2" />
                            Capacité
                        </h2>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground">
                                {itinerary.available_seats}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                sièges disponibles
                            </div>
                        </div>
                    </div>

                    {/* Destinations */}
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 flex items-center text-lg font-semibold">
                            <Calendar size={20} className="mr-2" />
                            Destinations
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-sm text-muted-foreground">
                                    Départ
                                </div>
                                <div className="font-medium">
                                    {itinerary.start.name}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">
                                    Arrivée
                                </div>
                                <div className="font-medium">
                                    {itinerary.end.name}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Note (si présente) */}
                    {itinerary.note && (
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-3 flex items-center text-lg font-semibold">
                                <FileText size={20} className="mr-2" />
                                Note
                            </h2>
                            <p className="rounded-lg bg-muted/50 p-4 text-sm">
                                {itinerary.note}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
