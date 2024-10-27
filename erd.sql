CREATE TABLE `REF` (
  `REF ID` Number PK,
  `REF Code ` Text,
  `Start Date ` Date,
  `End Date` Date
);

CREATE TABLE `Roles` (
  `ID` Number PK,
  `Role` Text,
  `Role Code` Text
);

CREATE TABLE `User` (
  `ID` Number PK,
  `FName` Text,
  `LName` Text,
  `Role Code`  Text FK
);

CREATE TABLE `Document` (
  `Document ID` Number PK,
  `documentName` Text,
  `description` Text,
  `statusCode` Text,
  `upprovedBy` Text,
  `Link` Text,
  `Field` Type,
  `REF Code` Number FK,
  `User ` Number FK,
  `createdAt` Date,
  `reviewedAt` Date,
  `approvedAt` Date,
  FOREIGN KEY (`documentName`) REFERENCES `User`(`Role Code`),
  FOREIGN KEY (`approvedAt`) REFERENCES `REF`(`REF Code `)
);

CREATE TABLE `Document_Status` (
  `Status ID` Number PK,
  `Status name` Text,
  `Status Code` Number
);

