import { Module } from "@nestjs/common";
import { FileResolver } from "./file.resolver";
import { FileService } from "./file.service";

@Module({
    imports: [],
    providers: [FileResolver, FileService],
})
export class FileModule {}
