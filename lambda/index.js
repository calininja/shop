const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // S3 버켓 이름
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // S3 오브젝트 키: 이미지 주소?
  console.log(Bucket, Key);
  const filename = Key.split('/')[Key.split('/').length - 1]; // 이미지 이름 추출
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // 확장자 소문자
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // 확장자 jpeg 변환
  console.log('filename', filename, 'ext', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise(); // S3 겟오브젝트 메소드에 Bucket 변수와 Key 변수 전달
    console.log('original', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body) // Sharp 라이브러리에 위의 s3Object 전달
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error)
    return callback(error);
  }
}