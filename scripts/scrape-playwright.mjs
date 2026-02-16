import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

const START_URL = 'https://www.cn-centrifuge.com/CDL7M-touch-screen-blood-bank-centrifuge-pd547090178.html';

// The function to be executed inside the browser page
const productEvalScript = () => {
    const name = document.querySelector('h1')?.innerText?.trim() || document.title.split('-')[0].trim();

    // IMAGES - ULTIMATE AGGRESSIVE
    const images = [];

    // 1. Look for ALL images, specifically targeting their CDN pattern
    const allImgs = Array.from(document.querySelectorAll('img, a'));
    allImgs.forEach(el => {
        const src = el.src || el.href || el.getAttribute('src') || el.getAttribute('data-src') || el.getAttribute('original-src');
        if (src && typeof src === 'string') {
            const isImage = (/\.(jpg|jpeg|png|webp)/i).test(src);
            const isCDN = src.includes('ldycdn.com') || src.includes('/cloud/') || src.includes('/upload/');
            const notIcon = !src.includes('logo') && !src.includes('icon') && !src.includes('facebook') && !src.includes('twitter');

            if ((isImage || isCDN) && notIcon) {
                try {
                    const abs = new URL(src, window.location.origin).href;
                    // Prefer larger images (usually have 800-800 or similar in name, or no sizing suffix)
                    if (!images.includes(abs)) images.push(abs);
                } catch (e) { }
            }
        }
    });

    // 2. Filter for high-quality images (exclude those that are confirmed tiny icons)
    const filteredImages = images.filter(img => {
        const lower = img.toLowerCase();
        return !lower.includes('100-100') && !lower.includes('icon') && !lower.includes('share');
    });

    // DESCRIPTION
    const descSelectors = ['.product-desc', '.product-detail', '#tab1', '#content', '.describe', '.pro-detail', '.pro_info', '.view_content'];
    let description = '';
    for (const sel of descSelectors) {
        const el = document.querySelector(sel);
        if (el && el.innerText.trim().length > 30) {
            description += el.innerText.trim() + '\n';
        }
    }

    if (description.length < 50) {
        description = document.body.innerText.replace(/\s+/g, ' ').slice(0, 1000);
    }

    // SPECS
    const specs = [];
    document.querySelectorAll('table tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td, th')).map(c => c.innerText.trim());
        if (cells.length >= 2) specs.push(cells.join(' : '));
    });

    // BREADCRUMBS
    const breadcrumbs = Array.from(document.querySelectorAll('.breadcrumb a, .crumbs a, .path a')).map(a => a.innerText.trim());

    return {
        name,
        description: description.replace(/\s+/g, ' ').trim(),
        specs,
        images: filteredImages.length > 0 ? filteredImages : images.slice(0, 5),
        breadcrumbs
    };
};

async function scrape() {
    console.log('🚀 Launching FINAL ULTIMATE Scraper...');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log(`Initial navigation to ${START_URL}...`);
    await page.goto(START_URL, { timeout: 60000, waitUntil: 'networkidle' });

    // 1. Extract ALL Category Links
    console.log('Detecting all categories...');
    const categories = await page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, div'));
        const catHeader = headers.find(h => h.innerText.includes('Product Category'));
        if (!catHeader) return [];

        const parent = catHeader.parentElement;
        return Array.from(parent.querySelectorAll('a'))
            .filter(a => a.href && a.href.includes('.html') && !a.href.includes('-pd'))
            .map(a => ({ name: a.innerText.trim(), url: a.href }));
    });

    const uniqueCategories = [];
    const seenCatUrls = new Set();
    for (const cat of categories) {
        if (!seenCatUrls.has(cat.url)) {
            seenCatUrls.add(cat.url);
            uniqueCategories.push(cat);
        }
    }

    console.log(`✅ Found ${uniqueCategories.length} categories.`);

    const allProducts = [];
    const seenProductUrls = new Set();

    for (const cat of uniqueCategories) {
        let currentUrl = cat.url;
        console.log(`\n📂 CATEGORY: ${cat.name} (${currentUrl})`);

        while (currentUrl) {
            try {
                await page.goto(currentUrl, { timeout: 45000, waitUntil: 'networkidle' });

                const productLinks = await page.evaluate(() => {
                    return Array.from(document.querySelectorAll('a'))
                        .map(a => a.href)
                        .filter(href => href && href.includes('-pd') && href.includes('.html'));
                });

                const uniqueOnPage = [...new Set(productLinks)];
                console.log(`   Page loaded. Found ${uniqueOnPage.length} items.`);

                for (const pUrl of uniqueOnPage) {
                    if (seenProductUrls.has(pUrl)) continue;
                    seenProductUrls.add(pUrl);

                    const pPage = await context.newPage();
                    try {
                        console.log(`     Scraping: ${pUrl.split('/').pop()}`);
                        await pPage.goto(pUrl, { timeout: 30000, waitUntil: 'networkidle' });

                        const data = await pPage.evaluate(productEvalScript);

                        allProducts.push({
                            url: pUrl,
                            category: cat.name,
                            id: pUrl.split('/').pop().replace('.html', ''),
                            ...data
                        });
                        console.log(`       -> OK: ${data.name.slice(0, 25)}... [Photos: ${data.images.length}]`);
                    } catch (e) {
                        console.error(`       -> ERR: ${e.message}`);
                    } finally {
                        await pPage.close();
                    }
                    await new Promise(r => setTimeout(r, 200));
                }

                // Next Page
                currentUrl = await page.evaluate(() => {
                    const next = Array.from(document.querySelectorAll('a')).find(a =>
                        a.innerText.includes('Next') || a.innerText.includes('>') || (a.title && a.title.includes('Next'))
                    );
                    return (next && next.href && !next.href.includes('javascript') && next.href !== window.location.href) ? next.href : null;
                });

                if (currentUrl) console.log(`   -> Next page detected...`);

            } catch (e) {
                console.error(`   -> Error: ${e.message}`);
                currentUrl = null;
            }
        }
    }

    const outputPath = join(process.cwd(), 'scraped_data_full.json');
    writeFileSync(outputPath, JSON.stringify(allProducts, null, 2));
    console.log(`\n🏆 TOTAL SCRAPED: ${allProducts.length} PRODUCTS`);
    console.log(`✅ File saved to: ${outputPath}`);
    await browser.close();
}

scrape().catch(console.error);
