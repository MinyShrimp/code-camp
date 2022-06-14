import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";
import { Storage } from "@google-cloud/storage";

@Injectable()
export class FileService {
    constructor() {}

    async upload(files: FileUpload[]) {
        // const file = await Promise.all(files);
        // console.log(file);

        const file = files[0];
        console.log(file.filename);

        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.FILE_KEY_LOCATION,
        })
            .bucket(process.env.FILE_BUCKET)
            .file(file.filename);

        file.createReadStream()
            .pipe(storage.createWriteStream())
            .on("finish", () => {})
            .on("error", () => {});

        return ["url"];
    }
}
