interface S3Repository {
  uploadImage(buffer: Buffer, key: string): Promise<string>;
  deleteImage(key: string) : Promise<void>;
}

export default S3Repository;
