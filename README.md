## Basic idea

Uses [aws-sdk](https://www.npmjs.com/package/aws-sdk) and [mysqldump](https://www.npmjs.com/package/mysqldump) to backup MySQL tables to an S3 bucket. Full credit to the authors of these modules. I'm simply gluing them together for convenience.

## Example usage

```
const dumpToS3 = require("mysqldump-to-s3")

const MYSQL_CONNECTION = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "my_blog",
}

const AWS_SECRETS = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
}

dumpToS3(
  MYSQL_CONNECTION, 
  AWS_SECRETS, 
  process.env.S3_BUCKET
)
```

## Output

If the mysqldump is successful for the database, a folder should be created in your S3 bucket containing the following:

```
[Weekday] [Month] [Day] [Year]/[Database-name]/data.sql
```
```
[Weekday] [Month] [Day] [Year]/[Database-name]/schema.sql
```
```
[Weekday] [Month] [Day] [Year]/[Database-name]/triggers.sql
```
