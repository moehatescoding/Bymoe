import fs from 'fs';
import path from 'path';

const mapPath = path.join(__dirname, 'image_map.json');
const productsPath = path.join(__dirname, '..', 'lib', 'products.ts');

const imageMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Update the `p` function definition
// From:
// image:`https://picsum.photos/seed/${img}/600/800`,images:[`https://picsum.photos/seed/${img}/600/800`,`https://picsum.photos/seed/${img}2/600/800`,`https://picsum.photos/seed/${img}3/600/800`,`https://picsum.photos/seed/${img}4/600/800`],
// To:
// image: img, images: [img, img, img, img],
// BUT Wait, the `img` in products.ts currently is things like "men-shirt-1".
// If I change the `img` argument in the function call to `"/products/men/classic-white-oxford-shirt.jpg"`, I must also update the function definition.

const pFuncOld = "image:`https://picsum.photos/seed/${img}/600/800`,images:[`https://picsum.photos/seed/${img}/600/800`,`https://picsum.photos/seed/${img}2/600/800`,`https://picsum.photos/seed/${img}3/600/800`,`https://picsum.photos/seed/${img}4/600/800`]";
const pFuncNew = "image:img,images:[img,img,img,img]";

productsContent = productsContent.replace(pFuncOld, pFuncNew);

// Create a lookup for fast access
const pathLookup: Record<string, string> = {};
for (const entry of imageMap) {
  pathLookup[entry.id] = entry.localPath;
}

// Replace the lines
// Each line looks like: p("m1","Classic White Oxford Shirt",... ,"men-shirt-1",...)
// We can use a regex to match the `p("id", ...)` call and replace the 8th argument.
// Regex: p\("([^"]+)",([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),"([^"]+)"
// Wait, product names could have quotes? No, they don't.
const lines = productsContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim().startsWith('p(')) {
    // Extract the ID
    const match = line.match(/p\("([^"]+)"/);
    if (match) {
      const id = match[1];
      if (pathLookup[id]) {
        // Find the 8th argument.
        // Let's just split by comma, taking care of quotes.
        // Actually, since we know the exact string, we can extract the `img` argument.
        // Current format: `,"img_placeholder",`
        // We know the 8th argument is a string literal.
        // Let's use a replacer function on the whole line:
        // p(id, name, slug, cat, sub, price, origPrice, img, desc, inStock, featured)
        
        // Let's match all string arguments to find the image slug. It is the 8th argument.
        const newLocalPath = pathLookup[id];
        
        // The safest way: we know the structure.
        // p("id","name","slug","cat","sub",price,origprice,"img_slug","desc",...)
        const parts = line.split('","');
        // parts[0] is `  p("m1` or `p("m1`
        // parts[1] is `Classic White Oxford Shirt`
        // parts[2] is `classic-white-oxford-shirt`
        // parts[3] is `men`
        // parts[4] is `Shirts",1299,1999,"men-shirt-1`
        // parts[5] is `A timeless white Oxford shirt ...`
        
        // This is fragile. Let's use a regex that matches the number arguments.
        // p\("([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*"([^"]+)"
        const regex = /(p\("([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*)"([^"]+)"/;
        const lineMatch = line.match(regex);
        if (lineMatch) {
          const prefix = lineMatch[1];
          const oldImg = lineMatch[9];
          lines[i] = line.replace(`${prefix}"${oldImg}"`, `${prefix}"${newLocalPath}"`);
        }
      } else {
        // If it wasn't downloaded, we should still fix the fact that `pFuncOld` was replaced!
        // Wait, if it wasn't downloaded, it will break because `image: img` will be just `"men-shirt-1"`.
        // So we must replace the 8th arg with the full picsum URL if it failed!
        const regex = /(p\("([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*)"([^"]+)"/;
        const lineMatch = line.match(regex);
        if (lineMatch) {
          const prefix = lineMatch[1];
          const oldImg = lineMatch[9];
          const newUrl = `https://picsum.photos/seed/${oldImg}/600/800`;
          lines[i] = line.replace(`${prefix}"${oldImg}"`, `${prefix}"${newUrl}"`);
        }
      }
    }
  }
}

fs.writeFileSync(productsPath, lines.join('\n'));
console.log('Successfully updated lib/products.ts');
