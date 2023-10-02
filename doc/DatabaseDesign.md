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
**1. Create**

- Create is a one-to-one relation between ```UserInfo``` and ```MyList```. User can create their own list to collect their favourite games.
- Assumption: Each user has only one favourite game list called “MyList”, and each list should correspond to one user.

**2. Request**

- Request is a zero or one-to-many relationship between ```Popularity``` and ```UserInfo```. A user can request a popular game recommendation.
- Assumption: Users may not request popularity recommendations. When they request, they will receive one recommendation, and a new recommendation will follow up if the previous one is rejected.  

**3. Write**

- Wrote is a one to zero or many relation between ```Reviews``` and ```UserInfo```. A user can write the reviews on the review.
- Assumption: Users may write reviews. A user can write multiple reviews, but a review must belong to one user. 

**4. Search**

- Search is a one to zero or many relation between ```GameInfo``` and ```UserInfo```. Users can search for the game that they are interested in.
- Assumption: Each user can search multiple times, and every search belongs to one user.

**5. Relate**

- Relate is a zero or one to one relation between ```Popularity``` and ```GameInfo```. The Popularity will recommend one of the most popular games and relate it with its game information.
- Assumption: Each popularity recommendation relates to one game information. Each game information may or may not relate to one popular recommendation. 

**6. Link**

- Link is a one-to-many relation between ```MyList``` and ```GameInfo```. Users can find the corresponding game information in the game list.
- Assumption: The MyList links to multiple game information. Each game information may or may not link to a list.

**7. For**

- For is a one-to-zero or many relation between ```Reviews``` and ```GameInfo```. The reviews are the feedback for each game.
- Assumption: A game may not have a review or may have multiple reviews. A review must be for one game.

**8. Include**

- Include is a many-to-many relation between the ```GameInfo``` and ```CategoryInfo```. 
- Assumption: A game may have multiple categories. In one category, there are many different games. 

**9. Contain**

- Contain is a many-to-many relation between ```GameInfo``` and ```Platform```. 
- Assumption: A platform contains many different games. A game can also contain many different supporting platforms. 

**10. Have**

- Have is a many-to-many relation between ```GameInfo``` and ```Genre```. 
- Assumption: A game has different genre categories. In one genre, there are many different games.



## Relational Schema
Here we will convert the database design into 11 tables

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



