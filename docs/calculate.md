# **Features – Travel Management App**

## Trip Management

- Enregistrer la date du trajet (`performed_at`)
- Ajouter la durée du vol (`duration`)
- Ajouter une observation (`observation`)
- Saisir le coût ACMI (location de l’appareil)

## Fuel Management

- Saisir le prix du carburant par litre (`fuel_price`)
- Saisir la quantité de carburant utilisée (`fuel_quantity`)
- Calcul automatique :
    - `fuel_cost = fuel_quantity × FUEL_ONE`

## Tax Management

- Définir les taxes :jt
    - Route
    - Stationnement
    - Atterrissage
    - Formulaire

- Calcul automatique :
    - `total_tax = somme(taxes)`

## Other Expenses

- Saisir les autres dépenses (AAC, RVA, ANR, Démiap, etc.)
- Calcul automatique :
    - `other_expenses_total = somme(dépenses)`

## Affrètement

- Ajouter des coûts d’affrètement personnalisés :
    - `name`
    - `amount`

- Calcul automatique :hj,hj
    - `affretement_total = somme(amount)`

## Financial Calculations

- Calcul du coût total du trip :

    ```
    total_cost = acmi + fuel_cost + total_tax + other_expenses_total + affretement_total
    ```

- Calcul du bénéfice net (net_profit / revenue) selon ta formule :

    ```
    net_profit = acmi - fuel_cost - total_tax
    ```

REGEX FLOAT OR DECIMAL : ^\d+(\.\d+)?$
