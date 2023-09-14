# Steam Interactive Recommender Engine

## Project Summary

The Steam Interactive Recommender Engine is a novel addition to the Steam platform, designed to redefine the game discovery experience. By harnessing a dynamic filtering system, it allows users to sift through games based on their individual preferences, ensuring they find titles that resonate with their interests. The system's intuitive interface simplifies the selection process, allowing gamers to effortlessly uncover gems within the vast Steam library.

In tandem with its recommendation capabilities, the engine incorporates seamless registration and login functionalities, creating a personalized journey for every user. As the platform looks to future enhancements, the focus remains clear: delivering a seamless, user-centric interface that makes game exploration both enjoyable and efficient. Through this approach, the Steam Interactive Recommender Engine is set to become an indispensable tool for gamers on the

## Description

SIRE aims to revolutionize the user experience on the Steam gaming platform. We want to provide personalized game recommendations based on individual gameplay preferences. This ensures users find games that align with their tastes, effectively simplifying their game search process.

Key Features:

- User Experience: With an intuitive registration and login process, SIRE ensures a tailored experience from the outset. Every user, whether new or returning, can navigate the platform with ease, accessing recommendations curated just for them.
- Recommendation System: At the heart of SIRE is its state-of-the-art recommendation engine. By processing vast amounts of data, it accurately predicts games that users are likely to enjoy. Moreover, users can explore popular games tailored to specific criteria, ensuring they always discover quality content.
- Community Engagement: Beyond game recommendations, SIRE values its community. Users can rate and review games, creating a rich repository of feedback. This not only guides fellow gamers in their choices but also provides developers with critical insights.

In essence, the Steam Interactive Recommender Engine is a confluence of technology and user-centric design, set to redefine how gamers discover and engage with content on Steam.

## Usefulness

The Steam Interactive Recommender Engine (SIRE) addresses the growing challenge of game discovery on the Steam platform, where an ever-increasing number of games can make it difficult for players to find titles that suit their individual tastes. Unlike traditional recommendation systems, including Steam's native feature, which often prioritize promoting new releases for commercial reasons, SIRE focuses on delivering personalized recommendations based on a user's gameplay history and specific preferences. This approach sidesteps the potential biases of advertising or promoting new titles, ensuring a more genuine list of game suggestions. Furthermore, SIRE sets itself apart by offering a unique blend of features that other platforms lack, such as "Popular Games Tendency," which allows users to track trending games within specific time frames, and "Game Review & Community Feedback," which incorporates the collective wisdom of the Steam community for a more enriched gaming experience.

## Realness

We decided to use Steam Game Data from data.world (https://data.world/craigkelly/steam-game-data), as it offers comprehensive information on various games and software available. It consists of 13,357 rows and 78 columns covering multiple aspects like basic product identifiers, characteristics counts, technical requirements, pricing, genres, reviews, and support details. This extensive data set encompasses everything from platform-specific requirements and pricing to genres, reviews, and even support and legal information, making it a valuable resource for deeper analysis or updates on Steam's gaming and software offerings.

## Functionality

The core function of our web application lets users search for games by name, generating detailed results that include the game's description, images, costs, and reviews. A separate panel allows users to apply filters such as PC compatibility, genres, and price for a more customized search experience. After authenticating through a username and password, users can personalize their experience by liking or disliking games, adding public reviews, and curating lists of favorite games. Our most advanced feature aims to further personalize game discovery by incorporating a quiz-like functionality that suggests games based on user responses, helping connect players with titles that are likely to interest them.

## Low Fidelity UI Mockup

![UI_mockup1](./figures/ui_mockup1.png)
![UI_mockup2](./figures/ui_mockup2.png)
![UI_mockup3](./figures/ui_mockup3.png)

## Project Work Distribution

The team will collectively work on backend and frontend, so we can all expand out full-stack abilities. However, we will be working individually to complete certain functionalities.
Xinzhe Miao: User authentication, account login and logout feature
Serena Gong: Game reccomendation algorithm, search bar and filtering functionalities
Yuteng Gao: Popular games functionality, ability to save liked/disliked games into list
Yihan Jiang: Game review and community feedback feature
