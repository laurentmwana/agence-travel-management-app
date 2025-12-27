'use client';

import { Button } from '@/components/ui/button';
import {
    AlertTriangle,
    Ban,
    Home,
    RefreshCw,
    Search,
    Server,
} from 'lucide-react';

interface ErrorPageProps {
    status: number;
    details?: string;
}

export default function ErrorPage({ status, details }: ErrorPageProps) {
    const errorConfig = {
        503: {
            title: 'Service Indisponible',
            description:
                'Le service est temporairement indisponible pour maintenance. Veuillez réessayer ultérieurement.',
            icon: Server,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
        },
        500: {
            title: 'Erreur Serveur',
            description:
                'Une erreur interne est survenue. Notre équipe technique a été notifiée.',
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
        },
        404: {
            title: 'Page Non Trouvée',
            description:
                "La page que vous recherchez est introuvable. Vérifiez l'URL et réessayez.",
            icon: Search,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        403: {
            title: 'Accès Refusé',
            description:
                "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource.",
            icon: Ban,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        },
    }[status] || {
        title: 'Erreur Inattendue',
        description:
            "Une erreur inattendue s'est produite. Veuillez réessayer.",
        icon: AlertTriangle,
        color: 'text-gray-500',
        bgColor: 'bg-gray-500/10',
    };

    const IconComponent = errorConfig.icon;

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-6">
            <div className="w-full max-w-md space-y-8 text-center">
                {/* Icon et code d'erreur */}
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div
                            className={`rounded-full ${errorConfig.bgColor} p-6`}
                        >
                            <IconComponent
                                className={`h-12 w-12 ${errorConfig.color}`}
                            />
                        </div>
                    </div>
                    <h1 className="text-7xl font-bold tracking-tight">
                        {status}
                    </h1>
                </div>

                {/* Titre et description */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-foreground">
                        {errorConfig.title}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        {errorConfig.description}
                    </p>
                    {details && (
                        <p className="text-sm text-muted-foreground/80 italic">
                            {details}
                        </p>
                    )}
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col gap-3 pt-4">
                    <Button onClick={handleGoHome} size="lg" className="w-full">
                        <Home className="mr-2 h-5 w-5" />
                        Retour à l'accueil
                    </Button>

                    <Button
                        onClick={handleRefresh}
                        variant="outline"
                        size="lg"
                        className="w-full bg-transparent"
                    >
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Réessayer
                    </Button>
                </div>

                {/* Footer */}
                <p className="text-xs text-muted-foreground/60">
                    Si le problème persiste, contactez notre support technique
                </p>
            </div>
        </div>
    );
}
