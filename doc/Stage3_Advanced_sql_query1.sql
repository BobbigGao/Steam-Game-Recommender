SELECT 
    g.headerImage,
    g.queryName,
    g.RecommendationCount,
    g.releaseDate,
    g.priceFinal,
    CASE WHEN p.PlatformMac = 'True' THEN 'Support' ELSE 'Not Support' END AS Mac,
    CASE WHEN p.PlatformLinux = 'True' THEN 'Support' ELSE 'Not Support' END AS Linux,
    CASE WHEN p.PlatformWindows = 'True' THEN 'Support' ELSE 'Not Support' END AS Windows
FROM (
    SELECT
        headerImage,
        queryName,
        r.RecommendationCount,
        releaseDate,
        priceFinal,
        g.queryID
    FROM 
        gameInfo g
    INNER JOIN 
        recommendation r ON r.queryID = g.queryID
    WHERE 
        YEAR(STR_TO_DATE(releaseDate, '%b %e %Y')) BETWEEN '1980' AND '2020'
    ORDER BY 
        r.RecommendationCount DESC
    LIMIT 50
) g 
INNER JOIN platform p ON g.queryID = p.queryID;
