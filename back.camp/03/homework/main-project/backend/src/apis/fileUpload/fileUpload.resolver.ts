import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { FileEntity } from './entities/file.entity';
import { FileUploadService } from './fileUpload.service';

/* FileUpload API */
@Resolver()
export class FileUploadResolver {
    private static readonly NAME = 'FileUpload';

    constructor(
        private readonly fileUploadService: FileUploadService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/uploadFile
     * @param files
     * @returns 업로드 URLs
     */
    @Mutation(
        () => [FileEntity], //
        { description: `${FileUploadResolver.NAME}` },
    )
    uploadFile(
        @Args({
            name: 'files',
            type: () => [GraphQLUpload],
        })
        files: FileUpload[], //
    ): Promise<FileEntity[]> {
        return this.fileUploadService.upload('test/origin/', files);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/fileUpload/:id
     * @param fileIDs
     * @response ResultMessage
     */
    @Mutation(
        () => [ResultMessage], //
        { description: `${FileUploadResolver.NAME} 삭제 ( Real )` },
    )
    deleteFileUpload(
        @Args({ name: 'fileIDs', type: () => [String] }) fileIDs: string[], //
    ): Promise<ResultMessage[]> {
        return this.fileUploadService.softDelete(fileIDs);
    }
}
