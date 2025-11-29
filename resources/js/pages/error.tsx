import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    AlertTriangle,
    Ban,
    Home,
    RefreshCw,
    Search,
    Server,
} from 'lucide-react';
import React from 'react';

interface ErrorProps {
    status: number;
}

const Error: React.FC<ErrorProps> = ({ status }) => {
    const errorConfig = {
        503: {
            title: 'Service Indisponible',
            description:
                'Le service est temporairement indisponible pour maintenance. Veuillez réessayer ultérieurement.',
            icon: Server,
        },
        500: {
            title: 'Erreur Serveur',
            description:
                'Une erreur interne est survenue. Notre équipe technique a été notifiée.',
            icon: AlertTriangle,
        },
        404: {
            title: 'Page Non Trouvée',
            description:
                "La page que vous recherchez est introuvable. Vérifiez l'URL et réessayez.",
            icon: Search,
        },
        403: {
            title: 'Accès Refusé',
            description:
                "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource.",
            icon: Ban,
        },
    }[status] || {
        title: 'Erreur Inattendue',
        description:
            "Une erreur inattendue s'est produite. Veuillez réessayer.",
        icon: AlertTriangle,
    };

    const IconComponent = errorConfig.icon;

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Head title={errorConfig.title} />
            <Card className="w-full max-w-md">
                <CardHeader className="pb-4 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-muted p-3">
                            <IconComponent className="h-6 w-6 text-muted-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">{status}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 text-center">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            {errorConfig.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {errorConfig.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button className="w-full">
                            <Home className="mr-2 h-4 w-4" />
                            Page d'accueil
                        </Button>

                        <Button className="w-full">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Réessayer
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Error;
