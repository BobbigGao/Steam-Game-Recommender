# Database Design

## UML diagram

## Entities
We have a total of 7 entities for our database design, and each is explained as follows

### 1. UserInfo
This is an entity regarding each user and their login information
1. **UserID**: a unique identifier to distinguish between users. It will be a string attribute and a primary key for this table,
2. **UserName**: a self selected username by the user, a string attribute
3. **Password**: a password created by the user, a string attribute

This entity is designed with the following assumptions:
1. Every user in the platform has unique UserID that cannot be modified.
2. Users can change their password, which will result in an update operation for this table.
3. Users cannot change their username
4. Once user has entered their username, password, and clicked log in, they will be redirected to the home page.

### 2. GameInfo
This is an entity regarding each game and their necessary information. 
1. **QueryID**: 


## Relations

## Relational Schema
Here we will convert the databse design into 11 tables

**1. UserInfo**
```mysql
UserInfo(
    UserID VARCHAR(255) [PK],
    UserName VARCHAR(255),
    Password VARCHAR(255),
    UserEmail VARCHAR(255)
)
```

**2. GameInfo**
```mysql
GameInfo(
    QueryID VARCHAR(255) [PK],
    QueryName VARCHAR(255),
    ReleaseDate VARCHAR(255),
    PriceFinal FLOAT,
    HeaderImage VARCHAR(255),
    DetailedDescription VARCHAR(255),
    SupportedLanguages VARCHAR(255),
    Popularity INT
)
```

**3. Populaity**
```mysql
Popularity(
    QueryID VARCHAR(255) [PK],
    QueryName VARCHAR(255),
    RecommendationCount INT
)
```

**3. Reviews**
```mysql
Reviews(
    CommentID VARCHAR(255) [PK],
    UserName VARCHAR(255) [FK to UserInfo.UserName],
    QueryID VARCHAR(255) [FK],
    CommentText VARCHAR(255),
    RatingDate VARCHAR(255)
)
```

**4. MyList**
```mysql
MyList(
    QueryID VARCHAR(255) [PK],
    QueryName VARCHAR(255)
)
```

**5. Genre**
```mysql
Genre(
    QueryID VARCHAR(255) [PK],
    GenrelsNonGame BOOLEAN,
    GenrelsIndie BOOLEAN,
    GenrelsAction BOOLEAN,
    GenrelsAdventure BOOLEAN,
    GenrelsCasual BOOLEAN,
    GenrelsStrategy BOOLEAN,
    GenrelsRPG BOOLEAN,
    GenrelsSimulation BOOLEAN,
    GenrelsRacing BOOLEAN
)
```

**6. Platform**
```mysql
Platform(
    QueryID VARCHAR(255) [PK],
    PlatformWindows BOOLEAN,
    PlatformLinux BOOLEAN,
    PlatformMac BOOLEAN
)
```
**7. CategoryInfo**
```mysql
CategoryInfo(
    QueryID VARCHAR(255) [PK],
    CategorySinglePlayer BOOLEAN,
    CategoryMultiplayer BOOLEAN, 
    CategoryCoop BOOLEAN,
    CategoryMMO BOOLEAN
)
```

## MySQL DDL Commands

```mysql
# Entities

CREATE TABLE UserInfo (
    UserID VARCHAR(255) PRIMARY KEY,
    UserName VARCHAR(255),
    UserEmail VARCHAR(255),
    Password VARCHAR(255)
);



