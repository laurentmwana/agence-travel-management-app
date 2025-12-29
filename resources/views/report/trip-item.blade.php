<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport de Voyage #{{ $trip['id'] ?? 'N/A' }}</title>
    <style>
        @page { margin: 20mm; }
        body { 
            font-family: DejaVu Sans, sans-serif; 
            font-size: 12px; 
            line-height: 1.5; 
            color: #000; 
            width: 100%;
        }
        .company-header {
            text-align: center;
            margin-bottom: 20px;
            page-break-after: avoid;
        }
        .company-logo {
            max-width: 120px;
            max-height: 60px;
            margin-bottom: 10px;
        }
        .company-name {
            font-size: 20px;
            font-weight: bold;
            margin: 5px 0;
        }
        .company-address {
            font-size: 11px;
            margin: 0;
        }
        .main-header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding: 20px 20px 20px;
            margin-bottom: 30px;
            page-break-after: avoid;
        }
        h1 { 
            font-size: 24px; 
            margin: 0 0 15px 0;
            font-weight: bold;
        }
        .header-table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border-collapse: collapse;
        }
        .header-table td {
            padding: 8px 0;
            border-bottom: 1px solid #ccc;
        }
        .header-table td:first-child {
            width: 120px;
            font-weight: bold;
        }
        .observation {
            margin: 20px 0;
            padding: 15px;
            border-left: 3px solid #000;
            background: #f9f9f9;
            page-break-inside: avoid;
        }
        .section { 
            margin-bottom: 30px;
            page-break-inside: avoid;
            page-break-after: auto;
        }
        h2 { 
            font-size: 15px; 
            margin-bottom: 15px; 
            border-bottom: 2px solid #000; 
            padding-bottom: 8px;
            font-weight: bold;
            page-break-after: avoid;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            border: 1px solid #000;
            margin-top: 10px;
            page-break-inside: auto;
        }
        table th, table td { 
            border: 1px solid #000; 
            padding: 10px 12px; 
            text-align: left;
        }
        th { 
            background: #f9f9f9; 
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
        }
        .table-cell { text-align: right; }
        .table-row .table-cell { text-align: left; }
        .total { 
            font-weight: bold; 
            background: #f0f0f0;
            font-size: 13px;
        }
        .route {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            border: 2px solid #000;
            background: #fafafa;
            page-break-inside: avoid;
        }
        .footer { 
            margin-top: 40px; 
            text-align: center; 
            font-size: 11px; 
            border-top: 1px solid #000; 
            padding-top: 20px;
            page-break-before: always;
        }
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-end { text-align: end; }
    </style>
</head>
<body>
    <!-- En-tête entreprise -->
    <div class="company-header">
        <img src="/favicon.ico" alt="Logo" class="company-logo">
        <div class="company-name">VOTRE ENTREPRISE AVIATION</div>
        <div class="company-address">123 Avenue de l'Aviation, Kinshasa, RDC<br>Tél: +243 XXX XXX XXX | Email: contact@votreentreprise.cd</div>
    </div>

    <div class="main-header">
        <h1>RAPPORT DE VOYAGE</h1>
        <table>
            <thead>
                <tr><th>Titre</th><th class="table-cell">Valeur</th></tr>
            </thead>
            <tbody class="text-left">
            <tr><td>N° Voyage</td><td class="table-cell">{{ $trip['id'] ?? 'N/A' }}</td></tr>
            <tr><td>Date</td><td class="table-cell">{{ \Carbon\Carbon::parse($trip['perfomed_at'] ?? now())->format('d/m/Y H:i') }}</td></tr>
            <tr><td>Durée</td><td class="table-cell">{{ number_format($trip['duration_hours'] ?? 0, 0) }} h</td></tr>
            <tr><td>Nombre de passagers</td><td class="table-cell">{{ number_format($trip['number_of_passenger'] ?? 0, 0) }}</td></tr>
            <tr><td>Prix total passager</td><td class="table-cell">{{ number_format($trip['total_price_passenger'] ?? 0, 0) }} $</td></tr>
            <tr><td>ACMI</td><td class="table-cell">{{ number_format($trip['acmi'] ?? 0, 0) }} $</td></tr>
            <tr><td>Taxes</td><td class="table-cell">{{ number_format($trip['total_tax'] ?? 0, 0) }} $</td></tr>
            </tbody>
        </table>
    </div>

    @if(isset($trip['observation']) && $trip['observation'])
    <div class="observation">
        <strong>Observation:</strong> {{ $trip['observation'] }}
    </div>
    @endif

    <div class="section">
        <h2>CARBURANT</h2>
        <table>
            <thead>
                <tr><th>Élément</th><th class="table-cell">Valeur</th></tr>
            </thead>
            <tbody>
                <tr><td>Quantité</td><td class="table-cell">{{ number_format($trip['fuel_quantity'] ?? 0, 2) }} L</td></tr>
                <tr><td>Prix</td><td class="table-cell">{{ number_format($trip['fuel_price'] ?? 0, 3) }} $/L</td></tr>
            </tbody>
        </table>
    </div>

    @if(isset($trip['itinerary']))
    <div class="section">
        <h2>ITINÉRAIRE</h2>
        <div class="route">
            {{ $trip['itinerary']['start_destination']['name'] ?? 'Départ' }} 
            → 
            {{ $trip['itinerary']['end_destination']['name'] ?? 'Arrivée' }}
        </div>
        <table>
            <tr><th>Type</th><td>{{ ucfirst($trip['itinerary']['type'] ?? 'N/A') }}</td></tr>
            <tr><th>Distance</th><td>{{ number_format($trip['itinerary']['distance_km'] ?? 0, 0) }} km</td></tr>
            <tr><th>N° Itinéraire</th><td>#{{ $trip['itinerary']['id'] ?? 'N/A' }}</td></tr>
        </table>
    </div>
    @endif

    @if(isset($trip['other_expenses']) && count($trip['other_expenses']))
    <div class="section">
        <h2>DÉPENSES DIVERSES</h2>
        <table>
            <thead>
                <tr><th>Bénéficiaire</th><th class="table-cell">Montant ($)</th></tr>
            </thead>
            <tbody>
                @foreach($trip['other_expenses'] as $expense)
                <tr><td>{{ $expense['name'] ?? 'N/A' }}</td><td class="table-cell">{{ number_format($expense['amount'] ?? 0, 2) }}</td></tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    @if(isset($trip['affretements']) && count($trip['affretements']))
    <div class="section">
        <h2>AFFRÈTEMENTS</h2>
        <table>
            <thead>
                <tr><th>Affréteur</th><th class="table-cell">Montant ($)</th></tr>
            </thead>
            <tbody>
                @foreach($trip['affretements'] as $affretement)
                <tr><td>{{ $affretement['name'] ?? 'N/A' }}</td><td class="table-cell">{{ number_format($affretement['amount'] ?? 0, 2) }}</td></tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    <div class="section">
        <h2>RÉSUMÉ FINANCIER</h2>
        <table>
            <tr><th>Coût total</th><td class="table-cell">{{ number_format($trip['total_cost'] ?? 0, 0) }} $</td></tr>
            <tr><th>Affrètements</th><td class="table-cell">{{ number_format($trip['affretement_total'] ?? 0, 2) }} $</td></tr>
            <tr><th>Dépenses diverses</th><td class="table-cell">{{ number_format($trip['total_expenses'] ?? 0, 2) }} $</td></tr>
            <tr class="total"><th>Bénéfice Net</th><td class="table-cell">{{ number_format($trip['net_profit'] ?? 0, 2) }} $</td></tr>
        </table>
    </div>

    <div class="footer">
        Généré le {{ now()->format('d/m/Y à H:i') }}
    </div>
</body>
</html>
