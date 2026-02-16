import { writeFileSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';

// Polyfill for fetch if needed, but Node 18+ has it.
// We will use standard fetch with a robust User-Agent.

const BASE_URL = 'https://www.cn-centrifuge.com';
const START_URL = 'https://www.cn-centrifuge.com/blood-bank-centrifuge.html'; // Guessed URL based on pattern, will try to navigate from home if needed.
// Actually, let's start with the specific product page user gave to find the category link, 
// OR start with the known category list if we can find it.
// The user gave: https://www.cn-centrifuge.com/CDL7M-touch-screen-blood-bank-centrifuge-pd547090178.html
// Breadcrumbs usually have the category link.

const TARGET_URL = 'https://www.cn-centrifuge.com/CDL7M-touch-screen-blood-bank-centrifuge-pd547090178.html';

async function fetchPage(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    } catch (e) {
        console.error(`Failed to fetch ${url}:`, e.message);
        return null;
    }
}

async function scrape() {
    console.log('Starting scrape...');

    // 1. Get the product page to find the Category Link
    const productHtml = await fetchPage(TARGET_URL);
    if (!productHtml) return;

    const $p = cheerio.load(productHtml);

    // Try to find the "Blood Bank Centrifuge" category link in breadcrumbs or sidebar
    // Selectors are guesses based on standard layouts, we'll log what we find.
    const categoryLink = $p('a:contains("Blood Bank Centrifuge")').attr('href');

    console.log('Category Link Found:', categoryLink);

    if (!categoryLink) {
        console.error('Could not find category link. Dumping some links for debugging...');
        $p('a').each((i, el) => {
            const text = $p(el).text().trim();
            if (text.includes('Centrifuge')) console.log(`${text}: ${$p(el).attr('href')}`);
        });
        return;
    }

    const fullCategoryUrl = categoryLink.startsWith('http') ? categoryLink : BASE_URL + categoryLink;
    console.log('Navigating to category:', fullCategoryUrl);

    // 2. Fetch Category Page
    const catHtml = await fetchPage(fullCategoryUrl);
    if (!catHtml) return;
    const $c = cheerio.load(catHtml);

    // 3. Find all products in this category
    const productLinks = [];
    // Selector guess: .product-item a, .list-item a, etc.
    // We'll look for links that look like product pages
    $c('a[href*="-pd"]').each((i, el) => {
        const href = $c(el).attr('href');
        if (href && !productLinks.includes(href)) {
            productLinks.push(href);
        }
    });

    console.log(`Found ${productLinks.length} products.`);

    const productsData = [];

    // 4. Scrape each product
    for (const link of productLinks) {
        const pUrl = link.startsWith('http') ? link : BASE_URL + link;
        console.log('Scraping product:', pUrl);

        // Slight delay to be nice
        await new Promise(r => setTimeout(r, 1000));

        const html = await fetchPage(pUrl);
        if (!html) continue;
        const $ = cheerio.load(html);

        const name = $('h1').text().trim() || $('.product-title').text().trim();
        const description = $('.product-description').text().trim() || $('.description').text().trim() || 'No description';
        const cleanDesc = description.replace(/\s+/g, ' ').substring(0, 500); // Truncate for sanity

        // Specs - logic to find table rows
        const specs = [];
        $('table tr').each((i, el) => {
            const row = $(el).text().replace(/\s+/g, ' ').trim();
            if (row.length > 5 && row.length < 100) specs.push(row);
        });

        // Images
        const images = [];
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            if (src && (src.includes('product') || src.includes('upload')) && !src.includes('logo')) {
                const fullSrc = src.startsWith('http') ? src : BASE_URL + src;
                if (!images.includes(fullSrc)) images.push(fullSrc);
            }
        });

        productsData.push({
            url: pUrl,
            id: link.split('/').pop().replace('.html', ''),
            name,
            description: cleanDesc,
            specs: specs.slice(0, 5), // Top 5 specs
            images: images.slice(0, 3)
        });
    }

    // 5. Save to file
    const outputPath = join(process.cwd(), 'scraped_centrifuges.json');
    writeFileSync(outputPath, JSON.stringify(productsData, null, 2));
    console.log(`Saved ${productsData.length} products to ${outputPath}`);
}

scrape();
