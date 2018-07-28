const mysqldump = require("mysqldump"),
	AWS = require("aws-sdk")

const dumpToS3 = (MYSQL_CONNECTION, AWS_SECRETS, S3_BUCKET) => {

	const { database } = MYSQL_CONNECTION
	const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = AWS_SECRETS

	const result = mysqldump({
	  connection: MYSQL_CONNECTION
	})

  AWS.config.credentials.accessKeyId = AWS_ACCESS_KEY_ID
  AWS.config.credentials.secretAccessKey = AWS_SECRET_ACCESS_KEY


	result.then(dumpSql => {
	  const s3 = new AWS.S3()
	  
	  // schema 
		s3.putObject({
			Bucket: S3_BUCKET,
			Key: `${new Date().toString().substr(0,16)}/${database}/schema.sql`,
			Body: dumpSql.dump.schema				
		}, (err, data) => {
			err
				? console.log(err)
				: console.log(`Successfully uploaded ${database} schema`)
		})

	  // data 
		s3.putObject({
			Bucket: S3_BUCKET,
			Key: `${new Date().toString().substr(0,16)}/${database}/data.sql`,
			Body: dumpSql.dump.data
		}, (err, data) => {
			err
				? console.log(err)
				: console.log(`Successfully uploaded ${database} data`)
		})

	  // triggers 
		s3.putObject({
			Bucket: S3_BUCKET,
			Key: `${new Date().toString().substr(0,16)}/${database}/triggers.sql`,
			Body: dumpSql.dump.trigger				
		}, (err, data) => {
			err
				? console.log(err)
				: console.log(`Successfully uploaded ${database} triggers`)
		})

	})

}

module.exports = dumpToS3