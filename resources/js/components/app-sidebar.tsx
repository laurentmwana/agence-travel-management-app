import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import acmi from '@/routes/acmi';
import destination from '@/routes/destination';
import itinerary from '@/routes/itinerary';
import liter from '@/routes/liter';
import passenger from '@/routes/passenger';
import reports from '@/routes/reports';
import tax from '@/routes/tax';
import trip from '@/routes/trip';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    DollarSign,
    DownloadCloud,
    Fuel,
    LayoutGrid,
    Map,
    PersonStanding,
    PlaneLanding,
    PlaneTakeoff,
    Share,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Destination',
        href: destination.index(),
        icon: Share,
    },
    {
        title: 'Itinéraire',
        href: itinerary.index(),
        icon: Map,
    },

    {
        title: 'Trajet',
        href: trip.index(),
        icon: PlaneLanding,
    },

    {
        title: 'Taxes',
        href: tax.index(),
        icon: DollarSign,
    },

    {
        title: '1 Litre',
        href: liter.index(),
        icon: Fuel,
    },

    {
        title: 'Par passanger',
        href: passenger.index(),
        icon: PersonStanding,
    },

    {
        title: 'ACMI',
        href: acmi.index(),
        icon: PlaneTakeoff,
    },

    {
        title: 'Rapports',
        href: reports.index(),
        icon: DownloadCloud,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
