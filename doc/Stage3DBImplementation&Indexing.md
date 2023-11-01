# Database Implementation and Indexing 

## GCP Connection 
We implement Steam Games database via Google Cloud Platform. Below demonstrates the successful connection to the database. 
![GCPConnection](./images/GCPConnection.png)
We used the show tables command to see tables implemented in the databse.

## DDL Commands 

``` SQL
CREATE TABLE UserInfo (
  userID INT PRIMARY KEY,
  userName VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE GameInfo (
  queryID INT PRIMARY KEY,
  queryName VARCHAR(255),
  releaseDate XYZ,
  priceFinal FLOAT,
  headerImage VARCHAR(255),
  detailedDescription VARCHAR(10000),
  supportedLanguages VARCHAR(255),
  steamPlayerEstimate INT
);

CREATE TABLE Recommendation (
  recommendationID INT,
  queryID INT,
  recommendationCount INT,
  PRIMARY KEY (reccomendationID, queryID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE
);

CREATE TABLE MyList (
  listID INT,
  queryID INT,
  userID INT,
  PRIMARY KEY (listID, queryID, userID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  FOREIGN KEY (userID) REFERENCES UserInfo(userID) ON DELETE CASCADE
);

CREATE TABLE Reviews (
  commentID INT,
  userID INT,
  queryID INT,
  commentText VARCHAR(1000),
  ratingDate,
  PRIMARY KEY (commentID, queryID, userID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  FOREIGN KEY (userID) REFERENCES UserInfo(userID) ON DELETE CASCADE
);

CREATE TABLE Genre (
  genreID INT,
  queryID INT,
  genrelsIndie BOOLEAN,
  genrelsAction BOOLEAN,
  genrelsAdventure BOOLEAN,
  genrelsCasual BOOLEAN,
  genrelsStrategy BOOLEAN,
  genrelsRPG BOOLEAN,
  genrelsSimulation BOOLEAN,
  genrelsRacing BOOLEAN,
  PRIMARY KEY (genreID, queryID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE
);

CREATE TABLE Platform(
  platformID VARCHAR(255),
  queryID VARCHAR(255),
  platformWindows BOOLEAN,
  platformLinux BOOLEAN,
  platformMac BOOLEAN
  PRIMARY KEY (platformID, queryID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE
);

CREATE TABLE CategoryInfo(
  categoryID VARCHAR(255) [PK]
  queryID VARCHAR(255) [FK to GameInfo.queryID],
  categorySinglePlayer BOOLEAN,
  categoryMultiplayer BOOLEAN, 
  categoryCoop BOOLEAN,
  categoryMMO BOOLEAN
  PRIMARY KEY (categoryID, queryID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE
);
```

## Data Insertation
During this stage, we will focus on game info and its various aspects. We are utilising gameInfo, category, platform, genre, recommendation, and inserting data into these four tables. We will not yet be auto-generating data representing users, reviews, or user-curated lists (myLists), and this will be implemented in the next stage. 


To populate these tables with relevant and comprehensive data, we have sourced our initial dataset from a curated collection on data.world, specifically from the repository "steam-game-data" provided by Craig Kelly (https://data.world/craigkelly/steam-game-data). This dataset includes detailed listings of games offered through Steam, encapsulating a variety of metadata.

As of now, we have successfully inserted a substantial volume of data—13,304 tuples—across these tables, demonstrating the project's progress and the breadth of information being managed. This is a significant milestone indicating that we have a substantial base of game data to work with.

![GCPShowTable](./images/GCPShowTable.png)


## Advanced SQL Queries
### Query-1 -- Popular Games Tendency

This SQL query provides the most popular games that were released within a specific year range and also shows whether the games are supported by Mac, Linux, and Windows. The users could select the year range they are interested in.
```mysql
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
    LIMIT 15
) g 
INNER JOIN platform p ON g.queryID = p.queryID
ORDER BY g.RecommendationCount DESC;
```
<img width="1479" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/95501811/896aa1c0-b7c5-4590-a2fc-76e073848776">



### Query-2 -- 'Action' Game price detection

The given SQL query retrieves information about games that belong to the "Action" genre and are available on both Windows and Mac platforms. The information is categorized based on the final price of the game into four distinct categories: "FREE", "Cheap", and "Expensive". The query then combines the results of these three categories using the UNION operator to provide a unified list.

```mysql
(SELECT DISTINCT queryName, releaseDate, priceFinal, "FREE" AS Price_Status, supportedLanguages
FROM gameInfo
JOIN genre USING (queryID) 
WHERE genrelsAction = 'True' AND priceFinal = 0 AND EXISTS (SELECT QueryID 
		FROM platform
		WHERE PlatformWindows = 'True' AND PlatformMac = 'True')
LIMIT 5)

UNION

(SELECT DISTINCT queryName, releaseDate, priceFinal, "Cheap" AS Price_Status, supportedLanguages
FROM gameInfo
JOIN genre USING (queryID) 
WHERE genrelsAction = 'True' AND priceFinal > 0 AND priceFinal <= 10 AND EXISTS (SELECT QueryID 
		FROM platform
		WHERE PlatformWindows = 'True' AND PlatformMac = 'True')
LIMIT 5)

UNION

(SELECT DISTINCT queryName, releaseDate, priceFinal, "Expensive" AS Price_Status, supportedLanguages
FROM gameInfo
JOIN genre USING (queryID) 
WHERE genrelsAction = 'True' AND priceFinal > 10 AND EXISTS (SELECT QueryID 
		FROM platform
		WHERE PlatformWindows = 'True' AND PlatformMac = 'True')
LIMIT 5)
```
<img width="1512" alt="Screenshot 2023-11-01 at 2 45 07 PM" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/f6ed30e8-7936-4337-b1f7-c8a34c4a677b">

## Indexing Analysis

### Query-1

Run ```EXPLAIN ANALYZE``` for the first query, the output is:
<img width="1475" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/95501811/b9e8198d-eef1-4303-b204-7cbb370afb8e">


To optimize the query and reduce the cost, creating appropriate indexes can help.

First we created an index on ```queryID``` of the gameinfo table:
```mysql
CREATE INDEX idx_queryID_on_gameInfo ON gameInfo(queryID);
```
Result:
<img width="1477" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/95501811/cebf4980-e9aa-4fec-837a-ecf6aafff728">



Then, we created an index on ```RecommendationCount``` of the recommendation table.

```mysql
CREATE INDEX idx_recommendation_count ON recommendation(RecommendationCount);
```
Result:
<img width="1478" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/95501811/7951b3cd-c788-48ad-83b5-85a1ea281752">

Next, we created an index on ```queryID``` of the platform table.

```mysql
CREATE INDEX idx_queryID_on_platform ON platform(queryID);
```
Result:
<img width="1486" alt="image" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/95501811/66d24d2a-8f9b-4578-b201-d4250d94c4d7">


Analysis of the result:

When an index is added to the queryID column of the gameinfo table, the result demonstrates a reduction in the "actual time" for executing the query. However, the estimated "cost" values did not exhibit any noticeable change. This phenomenon can be attributed to the fact that the queryID is already designated as a primary key for the table. When we manually add an index to a column that's already a primary key, the database system may recognize this redundancy and opt to use the pre-existing primary key index for lookups rather than the manually created index. This would explain why the estimated "cost" remains consistent before and after the index creation.


On the second attempt, the creation of an index on the RecommendationCount column of the recommendation table has led to a marked optimization in query performance. Before the index was added, a major portion of the cost was attributed to sorting the RecommendationCount in descending order, as indicated by the cost of 1481.15 for the sort operation. Post index creation, this cost dropped significantly to a mere 0.03. This indicates that the database is now able to efficiently utilize the idx_recommendation_count index to quickly retrieve rows based on the RecommendationCount values. Moreover, the overall cost associated with the nested loop inner join decreased from 6831.66 to 3895.14, reflecting a more efficient data retrieval process. The actual execution time also showcased improvement: the query execution reduced from 12 seconds to 0.17 seconds, which translates to a significant reduction in time.


Finally, when an index is added to the queryID column of the platform table, the result demonstrates a reduction in the "actual time" for executing the query. However, the estimated "cost" values did not exhibit any noticeable change. This is the same reason as the first case. The queryID is already designated as a primary key for the table. When we manually add an index to a column that's already a primary key, the database system may recognize this redundancy and opt to use the pre-existing primary key index for lookups rather than the manually created index. This would explain why the estimated "cost" remains consistent before and after the index creation.


### Query-2

Run ```EXPLAIN ANALYZE``` for the second query, the output is:
<img width="1512" alt="ORIGINAL" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/dc9490d9-d9be-49cb-befc-cd35ec677da3">

To optimize the query and reduce the cost, creating appropriate indexes can help.

First we created an index on ```queryID``` of the gameinfo table:
```mysql
CREATE INDEX idx_queryID_on_gameInfo ON gameInfo(queryID);
```
<img width="1512" alt="QUERYID" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/57b4b369-792f-4d83-be7f-b788878f4aee">

Then, we created an index on ```PlatformWindows``` of the platform table.
```mysql
CREATE INDEX idx_Windows_on_pt ON platform(PlatformWindows);
```
<img width="1512" alt="Windows" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/65828423-f5c7-488f-bf2b-b19150f17527">

Next, we created an index on ```PlatformMac``` of the platform table.
```mysql
CREATE INDEX idx_Mac_on_pt ON platform(PlatformMac);
```
<img width="1512" alt="Screenshot 2023-11-01 at 3 41 34 PM" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/1c6e23fd-29b9-4214-b566-2a0e672b1cc3">

Analysis of the result:

Adding an index to the queryID column in the gameinfo table, which is already designated as the primary key, results in a persistently reduced actual time for query execution while the estimated cost values remain unchanged. This phenomenon can be attributed to the fact that the queryID is already designated as a primary key for the table. When we manually add an index to a column that's already a primary key, the database system may recognize this redundancy and opt to use the pre-existing primary key index for lookups rather than the manually created index. This would explain why the estimated "cost" remains consistent before and after the index creation.

On the second attempt, the creation of an index on the PlatformWindows of the platform table has led to a marked optimization in query performance. The cost generated by 'Table scan on platform' dropped from 154147.07 to 74869.97, and the rows read by the system dropped from 12316 to 6158, reflecting a more efficient data retrieval process. This indicates that the database is now able to efficiently utilize the idx_Windows_on_pt index to quickly retrieve rows based on the platform values.

Finally, the creation of an index on the PlatformMac of the platform table has also led to a marked optimization in query performance, even better than the indexing for PlatformMac. The cost generated by 'Table scan on platform' dropped from 154147.07 to 48017.6, and the rows read by the system dropped from 12316 to 4551, reflecting a more efficient data retrieval process. This indicates that the database is now able to efficiently utilize the idx_Mac_on_pt index to quickly retrieve rows based on the platform values.


