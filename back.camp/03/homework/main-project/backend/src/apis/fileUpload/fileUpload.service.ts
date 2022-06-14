import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { FileUploadEntity } from './entities/fileUpload.entity';

@Injectable()
export class FileUploadService {
    constructor(
        @InjectRepository(FileUploadEntity)
        private readonly fileUploadRepository: Repository<FileUploadEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    async findOne(
        fileID: string, //
    ): Promise<FileUploadEntity> {
        return await this.fileUploadRepository.findOne({
            where: { id: fileID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 구글 Storage에 업로드 + DB에 저장
     * @param files
     * @returns 구글 Storage URLs
     */
    async upload(
        files: FileUpload[], //
    ): Promise<FileUploadEntity[]> {
        // 변수 초기화
        const writeFiles = await Promise.all(files);
        const key = './src/apis/fileUpload/key/gcp-key.json';

        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        // 업로드
        const storageUpload = (await Promise.all(
            writeFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    if (file.filename !== '') {
                        // 확장자 분리
                        const [_, prefix, suffix, ...__] = file.filename
                            .toLowerCase()
                            .match(/^(.+).(png|jpe?g|svg|gif|webp)/);

                        // 이름 Hashing
                        file.filename = `${bcrypt
                            .hashSync(prefix, bcrypt.genSaltSync())
                            .replace(/(\$|\.|\/)/g, 'v')}.${suffix}`;

                        file.createReadStream()
                            .pipe(
                                storage.file(file.filename).createWriteStream(),
                            )
                            .on('finish', () => {
                                resolve(
                                    `/${process.env.FILE_BUCKET}/${file.filename}`,
                                );
                            })
                            .on('error', (e) => reject(e));
                    } else {
                        resolve('');
                    }
                });
            }),
        )) as Array<string>;

        // DB Table에 추가
        const db_files = storageUpload
            .filter((v) => v !== '')
            .map((v) =>
                this.fileUploadRepository.create({
                    url: v,
                    name: v.split('/')[2],
                }),
            );

        await Promise.all(
            db_files.map((v) => this.fileUploadRepository.save(v)),
        );

        // 반환
        return db_files;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 삭제 ( Soft )
     * @param fileIDs
     * @returns ResultMessage
     */
    async softDelete(
        fileIDs: string[], //
    ): Promise<ResultMessage[]> {
        const key = './src/apis/fileUpload/key/gcp-key.json';

        // DB에 저장되어있는지 확인
        const dbFiles = await Promise.all(
            fileIDs.map((fileID) =>
                this.fileUploadRepository.findOne({
                    where: { id: fileID },
                }),
            ),
        );

        // 하나라도 DB에 값이 저장되어있지 않다면
        // 에러
        for (let i = 0; i < dbFiles.length; i++) {
            if (!dbFiles[i]) {
                throw new UnprocessableEntityException(
                    '파일을 찾을 수 없습니다.',
                );
            }
        }

        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        // 구글 삭제
        const storageUpload = await Promise.all(
            dbFiles.map(async (file) => {
                try {
                    return await storage.file(file.name).delete();
                } catch (e) {
                    return undefined;
                }
            }),
        );

        // DB에도 삭제
        const results = await Promise.all(
            dbFiles.map((file) =>
                this.fileUploadRepository.softDelete({
                    id: file.id,
                }),
            ),
        );

        return results.map((result, idx) => {
            const isSuccess = result.affected ? true : false;
            return new ResultMessage({
                id: dbFiles[idx].id,
                isSuccess,
                contents: isSuccess
                    ? `Completed FileUpload Delete`
                    : `Failed FileUpload Delete`,
            });
        });
    }
}
