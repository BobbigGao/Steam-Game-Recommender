# Database Implementation and Indexing 

## GCP Connection 
We implement Steam Games database via Google Cloud Platform. Below demonstrates the successful connection to the database. 
![GCPConnection](./images/GCPConnection.png)
We used the show tables command to see tables implemented in the databse.

## DDL Commands 

Entities
``` SQL
CREATE TABLE UserInfo (
  userID INT PRIMARY KEY,
  userName VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE GameInfo (
  queryID INT PRIMARY KEY,
  queryName VARCHAR(255),
  releaseDate VARCHAR(255),
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
  ratingDate VARCHAR(255),
  PRIMARY KEY (commentID, queryID, userID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  FOREIGN KEY (userID) REFERENCES UserInfo(userID) ON DELETE CASCADE
);

CREATE TABLE Genre (
  genreID INT,
  genrelsIndie BOOLEAN,
  genrelsAction BOOLEAN,
  genrelsAdventure BOOLEAN,
  genrelsCasual BOOLEAN,
  genrelsStrategy BOOLEAN,
  genrelsRPG BOOLEAN,
  genrelsSimulation BOOLEAN,
  genrelsRacing BOOLEAN,
  PRIMARY KEY (genreID, queryID),
);

CREATE TABLE Platform(
  platformID VARCHAR(255),
  platformWindows BOOLEAN,
  platformLinux BOOLEAN,
  platformMac BOOLEAN
  PRIMARY KEY (platformID, queryID),
);

CREATE TABLE CategoryInfo(
  categoryID VARCHAR(255) [PK]
  categorySinglePlayer BOOLEAN,
  categoryMultiplayer BOOLEAN, 
  categoryCoop BOOLEAN,
  categoryMMO BOOLEAN
  PRIMARY KEY (categoryID, queryID),
);
```
Relationships
```SQL
CREATE TABLE Search(
  queryID INT REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  userID INT REFERENCES UserInfo(userID) ON DELETE CASCADE,
  PRIMARY KEY (queryID, userID)
);

CREATE TABLE Belong(
  queryID INT REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  genreID INT REFERENCES Genre(genreID) ON DELETE CASCADE,
  PRIMARY KEY (queryID, genreID)
);

CREATE TABLE Support(
  queryID INT REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  platformID INT REFERENCES Platform(platformID) ON DELETE CASCADE,
  PRIMARY KEY (queryID, platformID)
);

CREATE TABLE Categorize(
  queryID INT REFERENCES GameInfo(queryID) ON DELETE CASCADE,
  categoryID INT REFERENCES Category(categoryID) ON DELETE CASCADE,
  PRIMARY KEY (queryID, categoryID)
);

CREATE TABLE Request(
  recommendationID INT REFERENCES Recommendation(recommendationID) ON DELETE CASCADE,
  userID INT REFERENCES UserInfo(userID) ON DELETE CASCADE,
  PRIMARY KEY (recommendationID, userID)
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
<img width="1480" alt="QUERY1-origin" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/bd358ce3-00e4-4c28-bbdf-f4ae70e6acb2">


To optimize the query and reduce the cost, creating appropriate indexes can help.

First we created an index on ```RecommendationCount``` of the recommendation table:
```mysql
CREATE INDEX idx_recommendation_count ON recommendation(RecommendationCount);
```
Result: 
<img width="1492" alt="query1-recommendation" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/afe5a705-97ed-42e5-8543-566a297e6deb">

Then, we created an index on ```priceFinal``` of the gameInfo table.

```mysql
CREATE INDEX idx_FINALPREICE_on_gameInfo ON gameInfo(priceFinal);
```
Result:
<img width="1506" alt="QUERY1-FINALPRICE" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/fd25125d-f681-4ec7-8ce1-d63534ea6296">


Next, we created an index on ```releaseDate``` of the gameInfo table.

```mysql
CREATE INDEX idx_releasedate ON gameInfo(releaseDate);
```
Result:
<img width="1482" alt="QUERY1-RELEASEDATE" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/c5baaf85-4674-4234-b494-e01c8802fb98">


Analysis of the result:

For the first attempt, the creation of an index on the RecommendationCount column of the recommendation table has led to a optimization in query performance. Before the index was added, a major portion of the cost was attributed to sorting the RecommendationCount in descending order. Post index creation, this cost dropped significantly. This indicates that the database is now able to efficiently utilize the idx_recommendation_count index to quickly retrieve rows based on the RecommendationCount values. Moreover, the overall cost associated with the nested loop inner join decreased from 17468.91 to 14459.63, reflecting a more efficient data retrieval process. 

For the second attempt, the creation of an index on the priceFinal column of the gameInfo also led to a optimization in query performance. Before the index was added, a major portion of the cost was attributed to sorting the priceFinal in descending order, as indicated by the cost of 1553.9 for the sort operation. Post index creation, this cost dropped to a mere 1481.15. This indicates that the database is now able to efficiently utilize the idx_FINALPREICE_on_gameInfo index to quickly retrieve rows based on the priceFinal values. Moreover, the overall cost associated with the nested loop inner join decreased from 17468.91 to 6839.15, reflecting a more efficient data retrieval process. 

For the third attempt, the creation of an index on the releaseDate column of the gameInfo table has led to a optimization in query performance. Before the index was added, a major portion of the cost was attributed to sorting the releaseDate in descending order, as indicated by the cost of 1553.9 for the sort operation. Post index creation, this cost dropped significantly to a mere 1481.15. This indicates that the database is now able to efficiently utilize the idx_releasedate index to quickly retrieve rows based on the gameInfo values. Moreover, the overall cost associated with the nested loop inner join decreased from 17468.91 to 6839.05, reflecting a more efficient data retrieval process. 

Finally, the optimization for the idx_releasedate index get the most effective indexing performance by comparing the metrics for all three indexing analysis. 

### Query-2

Run ```EXPLAIN ANALYZE``` for the second query, the output is:
<img width="1512" alt="QUERY2-ORIGIN" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/2d5d48da-9211-4f7e-bd80-698d14def91c">



To optimize the query and reduce the cost, creating appropriate indexes can help.

First we created an index on ```releaseDate``` of the gameinfo table:
```mysql
CREATE INDEX idx_realeasedate_on_gameInfo ON gameInfo(releaseDate);
```
<img width="1512" alt="QUERY2-RELEASETIME" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/7b3461d8-d113-4bf2-974a-97e657c70909">



Then, we created an index on ```PlatformWindows``` of the platform table.
```mysql
CREATE INDEX idx_Windows_on_pt ON platform(PlatformWindows);
```
<img width="1512" alt="QUERY-WINDOWS" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/d4695a3f-c970-4e94-b1e9-0038ae3426c0">



Next, we created an index on ```PlatformMac``` of the platform table.
```mysql
CREATE INDEX idx_Mac_on_pt ON platform(PlatformMac);
```
<img width="1512" alt="MAC-QUERY2" src="https://github.com/cs411-alawini/fa23-cs411-team041-LABO/assets/123212940/acc04dee-4448-4427-bf08-cbcd2ec7438d">


Analysis of the result:

For the first attempt, the creation of an index on the releaseDate of the gameInfo table has led to a little bit optimization in query performance. The cost generated by 'Table scan on platform' didn't drop a lot, and the rows read by the system doesn't change. For the time process, it droped from 0.045 to 0.041. Thus, indexing for the releaseDate is not performed very well and let's try another two indexing next.

For the second attempt, the creation of an index on the PlatformWindows of the platform table has led to a optimization in query performance. The cost generated by 'Table scan on platform' dropped from 161325.54 to 74868.97, and the rows read by the system dropped from 12316 to 6158, reflecting a more efficient data retrieval process. This indicates that the database is now able to efficiently utilize the idx_Windows_on_pt index to quickly retrieve rows based on the platform values.

For the third attempt, the creation of an index on the PlatformMac of the platform table has also led to a marked optimization in query performance, even better than the indexing for PlatformWindows. The cost generated by 'Table scan on platform' dropped from 161325.54 to 48017.6, and the rows read by the system dropped from 12316 to 4551, reflecting a more efficient data retrieval process. This indicates that the database is now able to efficiently utilize the idx_Mac_on_pt index to quickly retrieve rows based on the platform values.

Finally, the optimization for the idx_Mac_on_pt index get the most effective indexing performance by comparing the metrics for all three indexing analysis. 
