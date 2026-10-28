-- KPI commerciaux (DONNÉES SYNTHÉTIQUES) — SQL standard (testé avec SQLite ; compatible PostgreSQL / SQL Server avec adaptations mineures)
-- Table attendue : ventes(month TEXT 'YYYY-MM', region TEXT, category TEXT, orders INT, revenue_usd REAL, cost_usd REAL)

-- 1. Chiffre d'affaires, marge et panier moyen par région et par année
SELECT
    region,
    substr(month, 1, 4)                                        AS year,
    ROUND(SUM(revenue_usd), 0)                                 AS revenue_usd,
    ROUND(SUM(revenue_usd - cost_usd), 0)                      AS margin_usd,
    ROUND(100.0 * SUM(revenue_usd - cost_usd) / SUM(revenue_usd), 1) AS margin_pct,
    ROUND(SUM(revenue_usd) / SUM(orders), 1)                   AS avg_order_value
FROM ventes
GROUP BY region, substr(month, 1, 4)
ORDER BY year, revenue_usd DESC;

-- 2. Évolution mensuelle du chiffre d'affaires et croissance sur 12 mois (fonction fenêtre LAG)
WITH monthly AS (
    SELECT month, SUM(revenue_usd) AS revenue_usd
    FROM ventes
    GROUP BY month
)
SELECT
    month,
    ROUND(revenue_usd, 0) AS revenue_usd,
    ROUND(100.0 * (revenue_usd - LAG(revenue_usd, 12) OVER (ORDER BY month))
          / LAG(revenue_usd, 12) OVER (ORDER BY month), 1) AS yoy_growth_pct
FROM monthly
ORDER BY month;

-- 3. Part de chaque catégorie dans le chiffre d'affaires de la dernière année
SELECT
    category,
    ROUND(SUM(revenue_usd), 0) AS revenue_usd,
    ROUND(100.0 * SUM(revenue_usd) / SUM(SUM(revenue_usd)) OVER (), 1) AS share_pct
FROM ventes
WHERE substr(month, 1, 4) = (SELECT MAX(substr(month, 1, 4)) FROM ventes)
GROUP BY category
ORDER BY revenue_usd DESC;
