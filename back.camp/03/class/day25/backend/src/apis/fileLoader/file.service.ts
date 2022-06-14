import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";
import { Storage } from "@google-cloud/storage";
import * as path from "path";

@Injectable()
export class FileService {
    constructor() {}

    async upload(files: FileUpload[]) {
        const writeFiles = await Promise.all(files);
        console.log(writeFiles);

        // const file = files[0];
        // console.log(file.filename);

        const key = path.join(__dirname, "../../../src", "commons", "file", process.env.FILE_KEY);

        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        const result = await Promise.all(
            writeFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    if (file.filename !== "") {
                        file.createReadStream()
                            .pipe(storage.file(file.filename).createWriteStream())
                            .on("finish", () =>
                                resolve(`/${process.env.FILE_BUCKET}/${file.filename}`)
                            )
                            .on("error", (e) => reject(e));
                    } else {
                        resolve("noneFile");
                    }
                });
            })
        );

        console.log(result);

        // writeFiles
        //     .filter((v) => v.filename !== "")
        //     .forEach((file) => {
        //         const f = storage.file(file.filename);

        //         file.createReadStream()
        //             .pipe(f.createWriteStream())
        //             .on("finish", () => {})
        //             .on("error", () => {});
        //     });

        return ["url"];
    }
}
