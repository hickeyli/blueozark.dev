import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

export const listProjectFiles = async () => {
  const params = {
    Bucket: 'blueozark-data',
    Prefix: 'projects/',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.map((file) => file.Key);
  } catch (error) {
    console.error('Error listing project files:', error);
    return [];
  }
};
