/* START Users */
CREATE TABLE IF NOT EXISTS Users (
	UserID INTEGER NOT NULL PRIMARY KEY,
	`Key` VARCHAR(60) NOT NULL,
	
	Avatar VARCHAR(30) NULL,
	Username VARCHAR(30) NOT NULL,
	
	Email VARCHAR(60) NOT NULL,
	HashedPassword VARCHAR(60) NOT NULL, 
	
	TotalScore INT NOT NULL DEFAULT 0,
    Streak INT NOT NULL DEFAULT 0,
	
	JoinedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    LastActivity TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    Thanks INT NOT NULL DEFAULT 0,
    
	HashedGoogleID VARCHAR(255) NULL,
	HashedFacebookID VARCHAR(255) NULL,
	
	Theme VARCHAR(5) CHECK(Theme IN ('dark', 'light')) NOT NULL DEFAULT 'dark'
);
/* END Users */


/* START Scores */
CREATE TABLE IF NOT EXISTS Scores (
	ScoreID INTEGER NOT NULL PRIMARY KEY,
	`User` INT NOT NULL,
	
	`Language` VARCHAR(30) NOT NULL,
	Score INT NOT NULL DEFAULT 0,
	
	FOREIGN KEY(`User`) REFERENCES Users(UserID)
);

CREATE TRIGGER OnUpdateScores AFTER UPDATE 
ON Scores FOR EACH ROW 
BEGIN
	UPDATE Users
	SET TotalScore = (
		SELECT sum(Score) FROM Scores 
		WHERE `User` = NEW.`User`
	)
   	WHERE UserID = NEW.`User`;
END;
/* END Levels */

SELECT s."Language", count(dt.TransID) AS TotalTranslations, 
        sum(dt.Upvotes) AS TotalUpvotes
        FROM DocTranslations AS dt
        INNER JOIN Scores AS s ON dt.PostedBy = s."User"
        WHERE dt.PostedBy = 1 AND (
            SELECT count(DocID) FROM Docs AS d 
            WHERE dt.Doc = d.DocID AND 
            (d.TranslateFrom = s."Language" 
            OR d.TranslateTo = s."Language")
        ) > 0 GROUP BY s."Language";

/* START Docs */
CREATE TABLE IF NOT EXISTS Docs (
	DocID INTEGER NOT NULL PRIMARY KEY,
	
	Title VARCHAR(300) NOT NULL,
	SourceURL VARCHAR(300) NOT NULL,
	
	TranslateFrom VARCHAR(30) NOT NULL,
	TranslateTo VARCHAR(30) NOT NULL,
	
	Upvotes INT NOT NULL DEFAULT 0,
	Topic VARCHAR(30) NOT NULL DEFAULT 'Other',
	
	Done INT NOT NULL DEFAULT 0,
	Total INT NOT NULL,
	
	Checked INT NOT NULL DEFAULT 0,
	PostedBy INT NOT NULL,
	
	CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY(PostedBy) REFERENCES Users(UserID)
);

CREATE TRIGGER OnUpdateDocs AFTER UPDATE 
ON Docs FOR EACH ROW 
BEGIN
	UPDATE Docs
	SET LastUpdate = strftime('%Y-%m-%d %H:%M:%S', 'now')
   	WHERE DocID = NEW.DocID;
END;
/* END Docs */


/* START DocTranslations */
CREATE TABLE IF NOT EXISTS DocTranslations (
	TransID INTEGER NOT NULL PRIMARY KEY,
	
	Content TEXT NOT NULL,
	Note TEXT NOT NULL,
	Upvotes INT NOT NULL DEFAULT 0,
	
	Doc INT NOT NULL,
	PostedBy INT NOT NULL,
	
	SentenceID INT NOT NULL,
	Selected VARCHAR(5) CHECK(Selected IN ('true', 'false')) NOT NULL DEFAULT 'true',
	
	CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY(Doc) REFERENCES Docs(DocID),
	FOREIGN KEY(PostedBy) REFERENCES Users(UserID)
);

CREATE TRIGGER OnInsertDocTranslations AFTER UPDATE 
ON DocTranslations FOR EACH ROW 
BEGIN
	UPDATE Docs 
	SET Done = (
		SELECT count(*) FROM DocTranslations 
		WHERE Doc = NEW.Doc AND Selected = 'true'
	)
	WHERE DocID = NEW.Doc;
END;
/* END DocTranslations */


/* START Upvotes */
CREATE TABLE IF NOT EXISTS Upvotes (
	UpID INTEGER NOT NULL PRIMARY KEY,
	
	Doc INT NOT NULL,
	UpvotedBy INT NOT NULL,
	
	FOREIGN KEY(Doc) REFERENCES Docs(DocID),
	FOREIGN KEY(UpvotedBy) REFERENCES Users(UserID)
);

CREATE TRIGGER OnUpdateUpvotes AFTER UPDATE 
ON Upvotes FOR EACH ROW 
BEGIN
	UPDATE Docs 
	SET Upvotes = (
		SELECT count(*) FROM Upvotes 
		WHERE Doc = NEW.Doc
	)
	WHERE DocID = NEW.Doc;
END;
/* END Upvotes */