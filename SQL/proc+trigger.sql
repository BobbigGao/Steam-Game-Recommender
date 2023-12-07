USE steamgames;
DELIMITER //
DROP PROCEDURE IF EXISTS CheckUsername;
DROP TRIGGER IF EXISTS BeforeInsertUserInfo;

CREATE PROCEDURE CheckUsername(IN inputUsername VARCHAR(255))
BEGIN
    DECLARE userCount INT;

    SELECT COUNT(*)
    INTO userCount
    FROM userInfo
    WHERE UserName = inputUsername;

    IF userCount > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Username already exists!';
    END IF;
END //

CREATE TRIGGER BeforeInsertUserInfo
BEFORE INSERT ON userInfo FOR EACH ROW
BEGIN
    CALL CheckUsername(NEW.UserName);
END //

DELIMITER ;

USE steamgames;
SHOW PROCEDURE STATUS WHERE Name = 'CheckUsername';
