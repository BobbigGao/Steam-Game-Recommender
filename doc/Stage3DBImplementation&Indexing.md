# Database Implementation and Indexing 

## GCP Connection 
![GCPConnection](./images/GCPConnection.png)

## DDL Commands 

``` SQL
CREATE TABLE UserInfo (
  userID VARCHAR(255) PRIMARY KEY,
  userName VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE GameInfo (
  
);
CREATE TABLE Recommendation (
  recommendationID INT,
  queryID INT,
  recommendationCount INT,
  PRIMARY KEY (reccomendationID, queryID),
  FOREIGN KEY (queryID) REFERENCES GameInfo(queryID) ON DELETE CASCADE
);
