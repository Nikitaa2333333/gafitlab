import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const SCRAPED_FILE = './scraped_data_full.json';
const IMAGE_DIR = './public/images/products';

if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(SCRAPED_FILE, 'utf8'));

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, {
            headers: {
                'Referer': 'https://www.cn-centrifuge.com/',
                'User-Agent': 'Mozilla/5.0'
            }
        }, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error(`Status: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
};

async function start() {
    console.log('🚀 Starting image download... This may take a minute.');
    let count = 0;
    for (const p of products) {
        const uniqueImages = p.images.filter(img =>
            !img.includes('TG16-Table-Top') &&
            !img.includes('TGL16-Table-Top') &&
            !img.includes('TG20-Table-top') &&
            !img.includes('products.jpg')
        );

        if (uniqueImages.length > 0) {
            const url = uniqueImages[0];
            const ext = path.extname(url).split('?')[0] || '.png';
            const filename = `${p.id}${ext}`;
            const dest = path.join(IMAGE_DIR, filename);

            if (!fs.existsSync(dest)) {
                try {
                    await download(url, dest);
                    count++;
                    if (count % 10 === 0) console.log(`📸 Downloaded ${count} images...`);
                } catch (e) {
                    // Fail silently for now
                }
            }
        }
    }
    console.log(`✅ Finished! Downloaded ${count} new images to ${IMAGE_DIR}`);
}

start();
