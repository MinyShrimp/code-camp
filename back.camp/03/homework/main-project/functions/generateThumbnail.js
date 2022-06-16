const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');

(async (file, context) => {
    console.log(context.eventType);

    const name = file.name;
    const paths = name.split('/');
    const filename = paths.slice(-1)[0];
    const path = paths.slice(0, -2).join('/') + '/';

    if (filename.startsWith('thumb_')) {
        return null;
    }

    console.log(paths, filename, path);

    const [_, prefix, suffix] = filename.match(/(.+)\.(png|jpe?g|gif|webp)/);
    const configs = [
        { size: 320, path: 'thumb/s/' },
        { size: 640, path: 'thumb/m/' },
        { size: 1280, path: 'thumb/l/' },
    ];

    const storage = new Storage().bucket(file.bucket);

    await Promise.all(
        configs.map((config) => {
            return new Promise((resolve, reject) => {
                const _path = path + config.path;
                const _name = 'thumb_' + prefix + '_' + config.size;
                const _full_path = `${_path}${_name}.${suffix}`;

                console.log(_full_path);

                storage
                    .file(name)
                    .createReadStream()
                    .pipe(
                        sharp()
                            .resize({ width: config.size })
                            .pipe(
                                storage
                                    .file(_full_path)
                                    .createWriteStream()
                                    .on('finish', resolve)
                                    .on('error', reject),
                            ),
                    );
            });
        }),
    );
})(
    {
        name: 'test/ok/vDYZRvhwvwN1vYCbtS1H.png',
        bucket: 'code-camp-main-project',
        contentType: 'image/jpeg',
        crc32c: '',
        etag: '',
        generation: '',
        id: '',
        kind: 'storage#object',
        md5Hash: '',
        mediaLink: '',
        metagenration: 1,
        selfLink: '',
        size: '0',
        storageClass: 'STANDARD',
        timeCreated: '',
        timeStorageClassUpdated: '',
        updated: '',
    },
    {
        eventId: '4915466394012419',
        timestamp: '2022-06-15T06:47:18.098Z',
        eventType: 'google.storage.object.finalize',
        resource: {
            service: 'storage.googleapis.com',
            name: 'projects/_/buckets/code-camp-main-project/objects/example.jpeg',
            type: 'storage#object',
        },
    },
);
