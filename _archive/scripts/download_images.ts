import fs from 'fs';
import path from 'path';
import axios from 'axios';
import google from 'googlethis';
// Use relative import to avoid tsconfig path issues
import { products, Product } from '../lib/products';

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'products');

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 10000,
    });

    const writer = fs.createWriteStream(destPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(true));
      writer.on('error', (err) => {
        fs.unlink(destPath, () => {});
        console.error(`Error writing ${destPath}: ${err.message}`);
        resolve(false);
      });
    });
  } catch (error: any) {
    console.error(`Error downloading ${url}: ${error.message}`);
    return false;
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processProducts() {
  const productsToUpdate: { product: Product, localPath: string }[] = [];

  for (const product of products) {
    if (product.id === 'i1') {
      console.log(`Skipping: ${product.name} (IKEA LUNGÖN Privacy Screen)`);
      continue;
    }

    console.log(`\nProcessing: ${product.name}`);
    const catDir = path.join(PUBLIC_DIR, product.category);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }

    // Attempt to search
    try {
      const query = `"${product.name}" ${product.category} product photography high quality`;
      console.log(`Searching for: ${query}`);
      
      const images = await google.image(query, { safe: false });
      
      let downloaded = false;
      let localPath = '';

      // Try up to 3 images if the first fails
      for (let i = 0; i < Math.min(images.length, 3); i++) {
        const imageUrl = images[i].url;
        console.log(`Found image URL: ${imageUrl}`);
        
        // Extract extension or default to jpg
        const extMatch = imageUrl.match(/\.(jpg|jpeg|png|webp|avif)(?:\?|$)/i);
        const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
        
        const filename = `${product.slug}.${ext}`;
        const destPath = path.join(catDir, filename);
        localPath = `/products/${product.category}/${filename}`;

        console.log(`Downloading to: ${destPath}`);
        const success = await downloadImage(imageUrl, destPath);
        
        if (success) {
          downloaded = true;
          productsToUpdate.push({ product, localPath });
          console.log('Download successful.');
          break; // Stop trying URLs for this product
        } else {
          console.log('Download failed, trying next image...');
        }
      }

      if (!downloaded) {
        console.log(`Failed to download any image for ${product.name}`);
      }

      // Respect rate limits - wait 2-4 seconds between requests
      const delay = Math.floor(Math.random() * 2000) + 2000;
      await sleep(delay);

    } catch (err: any) {
      console.error(`Error searching for ${product.name}: ${err.message}`);
      await sleep(5000); // Wait longer if error
    }
  }

  // After all downloads, generate an update script or update lib/products.ts directly
  console.log('\n--- Finished Downloading ---');
  console.log(`Successfully downloaded images for ${productsToUpdate.length} products.`);

  // Write a mapping file so another script can update products.ts safely
  const mapPath = path.join(__dirname, 'image_map.json');
  fs.writeFileSync(mapPath, JSON.stringify(productsToUpdate.map(p => ({
    id: p.product.id,
    slug: p.product.slug,
    localPath: p.localPath
  })), null, 2));
  console.log(`Saved mapping to ${mapPath}`);
}

processProducts().catch(console.error);
