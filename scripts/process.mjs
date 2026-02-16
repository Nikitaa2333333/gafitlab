import fs from 'fs';
import path from 'path';

const SCRAPED_FILE = './scraped_data_full.json';
const OUTPUT_FILE = './lib/products_scraped.ts';
const LOCAL_IMAGE_DIR = './public/images/products';

const translate = (text) => {
    if (!text) return '';
    return text
        .replace(/Centrifuge/gi, 'Центрифуга')
        .replace(/Refrigerated/gi, 'с охлаждением')
        .replace(/High-Speed/gi, 'Высокоскоростная')
        .replace(/Low-Speed/gi, 'Низкоскоростная')
        .replace(/Table Top/gi, 'Настольная')
        .replace(/Blood Bank/gi, 'для банков крови')
        .replace(/Large Capacity/gi, 'Большой емкости')
        .replace(/Rotor/gi, 'Ротор');
};

const cleanDescription = (text) => {
    if (!text) return '';
    let cleaned = text.replace(/HOME ABOUT US.*?You are here:.*?»/gi, '');
    cleaned = cleaned.replace(/HOME ABOUT US.*?CONTACT US.*?\/ 简/gi, '');
    if (cleaned.includes('Share to:')) cleaned = cleaned.split('Share to:')[1];
    cleaned = cleaned.split('Product Category')[0];
    cleaned = cleaned.split('Add to Basket')[0];
    return cleaned.trim();
};

try {
    const scraped = JSON.parse(fs.readFileSync(SCRAPED_FILE, 'utf8'));

    const products = scraped.map(p => {
        let subId = p.category.toLowerCase()
            .replace(/[/]/g, '-')
            .replace(/[^a-z0-p]/g, '-')
            .replace(/-+/g, '-')
            .replace(/-$/, '')
            .replace(/^-/, '');

        if (subId.includes('lyophilizer')) subId = 'vacuum-freezer-dryer-lyophilizer';
        if (subId === 'prp-cgf-stem-cell-centrifuge') subId = 'prp--cgf-stem-cell-centrifuge';

        // Пытаемся найти локальную картинку
        const possibleExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
        let localImageUrl = '/images/placeholder.jpg';

        for (const ext of possibleExtensions) {
            const filename = `${p.id}${ext}`;
            if (fs.existsSync(path.join(LOCAL_IMAGE_DIR, filename))) {
                localImageUrl = `/images/products/${filename}`;
                break;
            }
        }

        const desc = cleanDescription(p.description);
        const finalDesc = translate(desc.slice(0, 300)) + (desc.length > 300 ? '...' : '');

        return {
            id: p.id,
            subcategoryId: subId,
            name: translate(p.name),
            specs: p.specs.filter(s => s.length > 3 && !s.includes('Availability')).slice(0, 10),
            description: finalDesc,
            images: [localImageUrl], // Теперь используем НАШУ локальную картинку!
            inStock: true
        };
    });

    const fileContent = `import { Product } from '../types';\n\nexport const SCRAPED_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};`;
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`✅ Success! All products now use LOCAL images for Vercel deployment.`);
} catch (e) {
    console.error(`❌ Error: ${e.message}`);
}
