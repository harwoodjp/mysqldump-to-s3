const dumpToS3 = require("./index")
require("dotenv").config()

const {
	MYSQL_HOST,
	MYSQL_USER,
	MYSQL_PASSWORD,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	S3_BUCKET
} = process.env

const MYSQL_CONNECTION = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: "",
}

const AWS_SECRETS = {
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY
}

dumpToS3(
	MYSQL_CONNECTION, 
	AWS_SECRETS, 
	S3_BUCKET
)