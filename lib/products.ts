export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  sku?: string;
  madeIn?: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  description: string;
  features?: string[];
  dimensions?: ProductSpec[];
  packaging?: ProductSpec[];
  materials?: ProductSpec[];
  careInstructions?: string[];
  inStock: boolean;
  featured?: boolean;
}

function p(id:string,name:string,slug:string,cat:string,sub:string,price:number,origPrice:number,img:string,desc:string,inStock:boolean,featured=false):Product{
  const discount=Math.round(((origPrice-price)/origPrice)*100);
  return{id,name,slug,category:cat,subcategory:sub,price,originalPrice:origPrice,discount,image:img,images:[img,img,img,img],description:desc,inStock:false,featured};
}

export const products: Product[] = [
  // MEN (20)
  p("m1","Classic White Oxford Shirt","classic-white-oxford-shirt","men","Shirts",1299,1999,"/products/men/classic-white-oxford-shirt.jpg","A timeless white Oxford shirt crafted from premium cotton. Perfect for both formal and casual occasions.",false),
  p("m2","Slim Fit Chinos","slim-fit-chinos","men","Trousers",1499,2499,"/products/men/slim-fit-chinos.jpg","Modern slim-fit chinos in versatile beige. Tailored for comfort with a structured silhouette.",false),
  p("m3","Merino Wool Crewneck","merino-wool-crewneck","men","Knitwear",2199,3499,"/products/men/merino-wool-crewneck.jpg","Luxuriously soft merino wool crewneck. Lightweight yet warm, perfect for layering.",false,true),
  p("m4","Linen Resort Shirt","linen-resort-shirt","men","Shirts",999,1799,"/products/men/linen-resort-shirt.jpg","Breathable linen shirt with relaxed fit. Ideal for warm weather and weekend getaways.",false),
  p("m5","Leather Derby Shoes","leather-derby-shoes","men","Footwear",3999,5999,"/products/men/leather-derby-shoes.webp","Hand-stitched leather Derby shoes with a timeless silhouette. Premium full-grain upper.",false),
  p("m6","Slim Tapered Jeans","slim-tapered-jeans","men","Trousers",1799,2799,"/products/men/slim-tapered-jeans.jpg","Dark indigo slim tapered jeans with a modern cut. Comfortable stretch fabric.",true,true),
  p("m7","Polo T-Shirt Pique","polo-tshirt-pique","men","T-Shirts",799,1299,"/products/men/polo-tshirt-pique.jpeg","Classic pique polo in navy. Ribbed collar and cuffs with a clean minimal aesthetic.",false),
  p("m8","Structured Blazer","structured-blazer","men","Jackets",4499,6999,"/products/men/structured-blazer.jpg","A sharp structured blazer in charcoal. Single-breasted with notch lapels.",false),
  p("m9","Cotton Crew Neck Tee","cotton-crew-tee","men","T-Shirts",599,999,"/products/men/cotton-crew-tee.jpg","Essential cotton crew neck in white. Relaxed fit with premium combed cotton.",true,true),
  p("m10","Canvas Sneakers","canvas-sneakers","men","Footwear",1299,1999,"/products/men/canvas-sneakers.jpg","Low-profile canvas sneakers in off-white. Vulcanized sole with a clean minimal look.",false),
  p("m11","Wool Flat Cap","wool-flat-cap","men","Accessories",699,1199,"/products/men/wool-flat-cap.jpg","Classic wool flat cap in grey herringbone. A refined finishing touch for any outfit.",false),
  p("m12","Slim Fit Trousers","slim-fit-trousers","men","Trousers",1599,2499,"/products/men/slim-fit-trousers.jpg","Tailored slim-fit trousers in charcoal grey. Flat front with a clean drape.",false),
  p("m13","Leather Belt","leather-belt","men","Accessories",899,1499,"/products/men/leather-belt.jpg","Full-grain leather belt with a polished silver buckle. A wardrobe essential.",false),
  p("m14","Bomber Jacket","bomber-jacket","men","Jackets",3499,5499,"/products/men/bomber-jacket.jpg","Satin bomber jacket in olive green. Ribbed cuffs and hem with zip closure.",false),
  p("m15","Linen Trousers","linen-trousers","men","Trousers",1299,2199,"/products/men/linen-trousers.jpg","Relaxed linen trousers in sand. Wide leg with elasticated waistband for comfort.",false),
  p("m16","Graphic Print Tee","graphic-print-tee","men","T-Shirts",699,1199,"/products/men/graphic-print-tee.jpg","Oversized graphic print tee in washed black. Premium cotton with artistic print.",true),
  p("m17","Suede Loafers","suede-loafers","men","Footwear",2999,4499,"/products/men/suede-loafers.jpg","Penny loafers in rich cognac suede. Leather sole with understated elegance.",false),
  p("m18","Quilted Vest","quilted-vest","men","Jackets",1999,3199,"/products/men/quilted-vest.jpg","Lightweight quilted vest for layering. Water-resistant shell with matte finish.",false),
  p("m19","Striped Socks Set","striped-socks-set","men","Accessories",399,699,"/products/men/striped-socks-set.jpg","Set of 3 striped cotton socks. Ribbed cuff in classic colours.",false),
  p("m20","Denim Jacket","denim-jacket","men","Jackets",2499,3999,"/products/men/denim-jacket.png","Classic denim jacket in mid-wash blue. Button closure with chest pockets.",false),

  // WOMEN (20)
  p("w1","Wrap Midi Dress","wrap-midi-dress","women","Dresses",1999,3199,"/products/women/wrap-midi-dress.jpg","Elegant wrap midi dress in dusty rose. Fluid fabric with a flattering V-neckline.",false,true),
  p("w2","High-Waist Wide Leg Pants","highwaist-wide-leg","women","Bottoms",1699,2799,"/products/women/highwaist-wide-leg.jpg","High-waist wide-leg trousers in cream. Tailored cut with a relaxed fall.",true,true),
  p("w3","Linen Crop Top","linen-crop-top","women","Tops",799,1399,"/products/women/linen-crop-top.jpg","Relaxed linen crop top with square neck. Minimal and effortlessly chic.",false),
  p("w4","Knit Cardigan","knit-cardigan","women","Tops",1799,2999,"/products/women/knit-cardigan.jpg","Chunky knit open-front cardigan in oat. Cozy and versatile for all seasons.",true),
  p("w5","Slip Dress","slip-dress","women","Dresses",1499,2499,"/products/women/slip-dress.jpg","Satin slip dress with adjustable straps. Minimalist silhouette in champagne.",false),
  p("w6","Straight Leg Jeans","straight-leg-jeans","women","Bottoms",1599,2599,"/products/women/straight-leg-jeans.jpg","Classic straight-leg jeans in light wash. High-rise waist with a clean silhouette.",false),
  p("w7","Blazer Dress","blazer-dress","women","Dresses",2999,4799,"/products/women/blazer-dress.jpg","Structured blazer dress in camel. Double-breasted with gold buttons.",false),
  p("w8","Ribbed Tank Top","ribbed-tank-top","women","Tops",599,999,"/products/women/ribbed-tank-top.jpg","Stretchy ribbed tank in white. Form-fitting with a scoop neckline.",false),
  p("w9","Trench Coat","trench-coat","women","Outerwear",5999,9999,"https://picsum.photos/seed/women-trch-1/600/800","Classic double-breasted trench coat in camel. Belted waist with epaulettes.",false),
  p("w10","Pleated Midi Skirt","pleated-midi-skirt","women","Bottoms",1299,2199,"/products/women/pleated-midi-skirt.jpg","Flowy pleated midi skirt in sage green. Elasticated waist with a luxurious drape.",true),
  p("w11","Oversized Blazer","oversized-blazer","women","Outerwear",3499,5499,"/products/women/oversized-blazer.jpg","Oversized blazer in cream. Relaxed silhouette that works over dresses or with jeans.",false),
  p("w12","Lace Trim Cami","lace-trim-cami","women","Tops",899,1499,"/products/women/lace-trim-cami.jpeg","Delicate lace-trim cami in ivory. Adjustable satin straps with a feminine finish.",false),
  p("w13","Leather Tote Bag","leather-tote-bag","women","Accessories",3999,6499,"/products/women/leather-tote-bag.jpg","Structured leather tote in tan. Spacious interior with magnetic clasp closure.",false),
  p("w14","Floral Midi Dress","floral-midi-dress","women","Dresses",1799,2999,"/products/women/floral-midi-dress.jpg","Romantic floral print midi dress with puff sleeves. Relaxed feminine silhouette.",false),
  p("w15","Block Heel Sandals","block-heel-sandals","women","Footwear",1999,3299,"/products/women/block-heel-sandals.jpg","Block heel sandals in nude. Ankle strap with a comfortable heel height.",false),
  p("w16","Cashmere Sweater","cashmere-sweater","women","Tops",4999,7999,"/products/women/cashmere-sweater.jpg","Ultra-soft cashmere turtleneck in caramel. Relaxed fit with a luxurious hand feel.",false),
  p("w17","Paperbag Waist Shorts","paperbag-shorts","women","Bottoms",999,1699,"/products/women/paperbag-shorts.jpg","Paperbag waist shorts in khaki. Tied bow detail and relaxed leg.",false),
  p("w18","Pearl Hoop Earrings","pearl-hoop-earrings","women","Accessories",699,1199,"/products/women/pearl-hoop-earrings.jpg","Elegant pearl hoop earrings in gold. A timeless accessory for any occasion.",false),
  p("w19","Puffer Jacket","puffer-jacket","women","Outerwear",3999,6499,"/products/women/puffer-jacket.jpg","Lightweight puffer jacket in forest green. Warm, packable and stylish.",false),
  p("w20","Maxi Wrap Skirt","maxi-wrap-skirt","women","Bottoms",1399,2299,"/products/women/maxi-wrap-skirt.jpg","Floor-length maxi wrap skirt in terracotta. Adjustable ties for a perfect fit.",false),

  // KIDS (18)
  p("k1","Dino Print Tee","dino-print-tee","kids","Boys",499,799,"/products/kids/dino-print-tee.jpg","Fun dinosaur print tee in sky blue. Soft cotton with vibrant graphics.",true),
  p("k2","Floral Dress","kids-floral-dress","kids","Girls",799,1299,"/products/kids/kids-floral-dress.png","Sweet floral print dress with smocked bodice. Easy pull-on style.",false),
  p("k3","Jogger Set","kids-jogger-set","kids","Unisex",999,1599,"/products/kids/kids-jogger-set.jpg","Matching jogger and hoodie set in grey marl. Cozy fleece fabric.",false),
  p("k4","School Shirt","kids-school-shirt","kids","School Wear",599,899,"/products/kids/kids-school-shirt.jpg","Crisp white school shirt with Peter Pan collar. Easy-care cotton blend.",false),
  p("k5","Denim Dungarees","denim-dungarees","kids","Unisex",1199,1999,"/products/kids/denim-dungarees.jpg","Classic denim dungarees with adjustable straps. Durable and playful.",false),
  p("k6","Rainbow Sneakers","rainbow-sneakers","kids","Footwear",999,1599,"/products/kids/rainbow-sneakers.jpg","Colourful rainbow sneakers with velcro strap. Easy on and off for little ones.",false),
  p("k7","Striped Polo","kids-striped-polo","kids","Boys",599,999,"/products/kids/kids-striped-polo.jpeg","Bold striped polo in red and white. Classic look for boys.",false),
  p("k8","Tutu Skirt","tutu-skirt","kids","Girls",699,1199,"/products/kids/tutu-skirt.jpg","Layered tulle tutu skirt in pink. Perfect for parties and dress-up play.",false),
  p("k9","Sherpa Hoodie","kids-sherpa-hoodie","kids","Unisex",1299,2199,"/products/kids/kids-sherpa-hoodie.jpg","Super warm sherpa-lined hoodie in oatmeal. Kangaroo pocket and cozy fit.",false),
  p("k10","School Trousers","kids-school-trousers","kids","School Wear",699,1099,"/products/kids/kids-school-trousers.jpg","Smart school trousers in navy. Elasticated waist for comfort and easy dressing.",false),
  p("k11","Animal Print Dress","animal-print-dress","kids","Girls",899,1499,"/products/kids/animal-print-dress.jpg","Adorable animal print dress with frilled hem. Soft jersey fabric.",false),
  p("k12","Cargo Shorts","kids-cargo-shorts","kids","Boys",799,1299,"/products/kids/kids-cargo-shorts.jpg","Functional cargo shorts with multiple pockets. Relaxed fit for active play.",false),
  p("k13","Glitter Ballet Pumps","glitter-ballet-pumps","kids","Footwear",799,1299,"/products/kids/glitter-ballet-pumps.jpg","Sparkling glitter ballet pumps in silver. A magical shoe for special occasions.",false),
  p("k14","Track Suit","kids-track-suit","kids","Unisex",1499,2499,"/products/kids/kids-track-suit.jpg","Co-ordinating tracksuit in electric blue. Zip-up jacket with striped trims.",false),
  p("k15","Sunflower Tee","sunflower-tee","kids","Girls",449,799,"/products/kids/sunflower-tee.jpg","Cheerful sunflower print tee in yellow. Soft cotton with a relaxed fit.",false),
  p("k16","School Shoes","kids-school-shoes","kids","School Wear",1199,1799,"/products/kids/kids-school-shoes.jpg","Classic black school shoes with buckle strap. Durable leather upper.",false),
  p("k17","Puffer Gilet","kids-puffer-gilet","kids","Unisex",1099,1799,"/products/kids/kids-puffer-gilet.jpg","Lightweight puffer gilet in red. Perfect for layering on cool days.",false),
  p("k18","Swim Shorts","kids-swim-shorts","kids","Boys",699,1099,"/products/kids/kids-swim-shorts.jpg","Tropical print swim shorts with adjustable waist. Quick-dry fabric.",false),

  // HOME (22)
  p("h1","Linen Throw Cushion","linen-throw-cushion","home","Decor",899,1499,"/products/home/linen-throw-cushion.jpg","Textured linen throw cushion in natural. Filled with plush insert.",false,true),
  p("h2","Marble Effect Tray","marble-effect-tray","home","Decor",1299,2199,"/products/home/marble-effect-tray.jpg","Elegant marble-effect resin tray in white and gold veining. Perfect for styling.",false),
  p("h3","Woven Storage Basket","woven-storage-basket","home","Storage",1599,2599,"/products/home/woven-storage-basket.jpg","Handwoven seagrass storage basket. Functional and decorative for any room.",true),
  p("h4","Ceramic Vase Set","ceramic-vase-set","home","Decor",1999,3199,"/products/home/ceramic-vase-set.png","Set of 3 minimalist ceramic vases in matte white. Perfect for dried florals.",false),
  p("h5","Cotton Waffle Throw","cotton-waffle-throw","home","Decor",1799,2999,"/products/home/cotton-waffle-throw.webp","Cozy cotton waffle throw blanket in ivory. Oversized for maximum comfort.",false),
  p("h6","Pendant Light","pendant-light","home","Lighting",3499,5499,"/products/home/pendant-light.jpg","Rattan pendant light with natural finish. Warm ambient glow for any space.",false),
  p("h7","Bamboo Shelf","bamboo-shelf","home","Furniture",4999,7999,"/products/home/bamboo-shelf.webp","Floating bamboo wall shelf in natural. Clean lines and sustainable material.",false),
  p("h8","Scented Candle Set","scented-candle-set","home","Decor",1299,2199,"/products/home/scented-candle-set.jpg","Set of 3 luxury soy wax candles. Fragrances: Sandalwood, Vanilla, Cedar.",true),
  p("h9","Monstera Plant Pot","monstera-plant-pot","home","Decor",799,1299,"/products/home/monstera-plant-pot.jpg","Minimalist terracotta plant pot with drainage hole. Matte white glaze finish.",false),
  p("h10","Linen Duvet Cover","linen-duvet-cover","home","Bedroom",4499,6999,"/products/home/linen-duvet-cover.jpg","100% washed linen duvet cover in natural grey. Gets softer with every wash.",false),
  p("h11","Acacia Wood Chopping Board","acacia-chopping-board","home","Kitchen",1499,2399,"/products/home/acacia-chopping-board.jpg","Large acacia wood chopping board with juice groove. Food-safe oil finish.",false),
  p("h12","Glass Storage Jars","glass-storage-jars","home","Kitchen",999,1699,"/products/home/glass-storage-jars.jpeg","Set of 3 airtight glass storage jars with bamboo lids. Perfect for pantry organisation.",false),
  p("h13","Abstract Art Print","abstract-art-print","home","Decor",1799,2999,"/products/home/abstract-art-print.jpg","A3 abstract art print in earthy tones. Unframed, printed on 200gsm matte paper.",false),
  p("h14","Velvet Ottoman","velvet-ottoman","home","Furniture",3999,6499,"/products/home/velvet-ottoman.jpg","Square velvet ottoman in dusty pink. Sturdy wooden legs with a plush top.",false),
  p("h15","Rattan Side Table","rattan-side-table","home","Furniture",2999,4999,"/products/home/rattan-side-table.jpg","Handwoven rattan side table with glass top. Bohemian yet minimal.",false),
  p("h16","Bathroom Organiser Set","bathroom-organiser","home","Storage",1299,2199,"/products/home/bathroom-organiser.jpg","Set of 4 white ceramic bathroom organisers. Toothbrush holder, soap dish, and more.",false),
  p("h17","Herringbone Rug","herringbone-rug","home","Decor",5999,9999,"/products/home/herringbone-rug.jpg","Handwoven cotton herringbone rug in charcoal. 120x180cm, ideal for living rooms.",false),
  p("h18","Table Lamp","table-lamp","home","Lighting",2499,3999,"/products/home/table-lamp.jpg","Ceramic base table lamp with linen shade. Warm ambient light for bedrooms.",false),
  p("h19","Modular Bookshelf","modular-bookshelf","home","Furniture",7999,12999,"/products/home/modular-bookshelf.jpeg","Modular wall-mounted bookshelf in white. Mix and match cubes for versatile storage.",false),
  p("h20","Kitchen Knife Set","kitchen-knife-set","home","Kitchen",3499,5499,"/products/home/kitchen-knife-set.jpeg","5-piece stainless steel kitchen knife set with wooden block. Razor-sharp edges.",false),
  p("h21","Macrame Wall Hanging","macrame-wall-hanging","home","Decor",1499,2499,"/products/home/macrame-wall-hanging.jpg","Boho macrame wall hanging in natural cotton. Large statement piece for blank walls.",false),
  p("h22","Stoneware Dinner Set","stoneware-dinner-set","home","Kitchen",3999,6499,"/products/home/stoneware-dinner-set.jpg","16-piece stoneware dinner set in matte sage. Plates, bowls, and mugs for 4.",false),

  // IKEA (15)
  {
    id: "i1",
    name: "LUNGÖN Privacy Screen",
    slug: "lungoen-privacy-screen",
    subtitle: "Off-white, Indoor/Outdoor",
    sku: "405.155.11",
    madeIn: "Bulgaria",
    category: "ikea",
    subcategory: "Outdoor",
    price: 2499,
    originalPrice: 7490,
    discount: Math.round(((7490 - 2499) / 7490) * 100),
    image: "/products/privacy-screen/privacy-screen-1.avif",
    images: [
      "/products/privacy-screen/privacy-screen-1.avif",
      "/products/privacy-screen/privacy-screen-2.avif",
      "/products/privacy-screen/privacy-screen-3.avif",
      "/products/privacy-screen/privacy-screen-4.avif",
      "/products/privacy-screen/privacy-screen-5.avif",
      "/products/privacy-screen/privacy-screen-6.avif",
    ],
    description: "Give yourself some extra privacy with the LUNGÖN privacy screen. Perfect by the sunbed or by the dining table in the garden and on the terrace. Can also be used as a room divider – both indoors and outdoors.\n\nThe privacy screen is freestanding and can be used as a support for various climbing plants and as a room divider to create defined spaces both outdoors and indoors. Easy to adapt to your space by using one privacy screen or combining several. Simple to move around – use it by the sunbed during the day and by the dining table in the evening.",
    features: [
      "Suitable for both indoor and outdoor use",
      "Freestanding – no wall or fixing required",
      "Can support climbing plants",
      "Combine multiple screens to cover larger areas",
      "Easy to move and reposition",
      "Suitable for use in public environments – design and materials are optimised for frequent use",
    ],
    dimensions: [
      { label: "Height", value: "140 cm (55 1/8\")" },
      { label: "Width", value: "80 cm (31 1/2\")" },
      { label: "Depth", value: "40 cm (15 3/4\")" },
    ],
    packaging: [
      { label: "Width", value: "43 cm (16 ¾\")" },
      { label: "Height", value: "6 cm (2 ¼\")" },
      { label: "Length", value: "85 cm (33 ½\")" },
      { label: "Weight", value: "9.30 kg (20 lb 8 oz)" },
      { label: "Packages", value: "1" },
    ],
    materials: [
      { label: "Partition wall", value: "Galvanized steel, Polyester powder coating" },
      { label: "U profile", value: "Steel, Galvanized, Polyester powder coating" },
      { label: "Foot", value: "Steel, Galvanized, Polyester powder coating" },
    ],
    careInstructions: [
      "Clean with a mild soapy solution",
      "Wipe dry with a clean, dry cloth",
      "Re-tighten screws at least once per season to maintain stability",
    ],
    inStock: true,
    featured: true,
  },
  p("i2","SÖDERHAMN 3-Seat Sofa","soderhamn-sofa","ikea","Furniture",49999,64999,"/products/ikea/soderhamn-sofa.jpg","The SÖDERHAMN sofa has a low, soft expression that gives a modern, relaxed look. Its modular design means you can configure it your own way. Chaise longue available separately.",false),
  p("i3","KALLAX Shelf Unit","kallax-shelf-unit","ikea","Storage",8999,12999,"/products/ikea/kallax-shelf-unit.jpg","KALLAX shelf unit is a simple, stylish storage solution. Use it as a room divider or shelving unit. Add doors, drawers and boxes for more customised storage.",false),
  p("i4","MALM Bed Frame","malm-bed-frame","ikea","Furniture",22999,29999,"/products/ikea/malm-bed-frame.jpg","MALM bed frame in smooth white finish. Clean lines for a modern bedroom. Adjustable bed sides allow use of mattresses of different thicknesses.",false),
  p("i5","BILLY Bookcase","billy-bookcase","ikea","Storage",6999,9999,"/products/ikea/billy-bookcase.jpg","The BILLY bookcase is a classic from IKEA. Adjustable shelves with 5cm spacing so you can customise your storage. In white, it fits anywhere.",false),
  p("i6","POÄNG Armchair","poang-armchair","ikea","Furniture",12999,17999,"https://picsum.photos/seed/ikea-poang-1/600/800","POÄNG armchair layers bentwood to create a flexible, springy back that adapts to your body and gently swings as you move. Timeless Scandinavian design.",false),
  p("i7","LACK Side Table","lack-side-table","ikea","Furniture",1499,2499,"/products/ikea/lack-side-table.jpg","LACK side table has a simple design that blends into any home. The hollow construction makes it lightweight. Use it as a side table or a lamp table.",false),
  p("i8","FADO Table Lamp","fado-table-lamp","ikea","Lighting",3499,4999,"/products/ikea/fado-table-lamp.jpeg","The FADO lamp gives a soft, mood-creating light. The globe-shaped shade in opal glass gives an even light distribution all around.",false),
  p("i9","KUNGSBACKA Kitchen Door","kungsbacka-door","ikea","Kitchen",2499,3499,"/products/ikea/kungsbacka-door.webp","KUNGSBACKA door fronts are made from recycled plastic bottles. The matte anthracite finish is a modern choice for any kitchen.",false),
  p("i10","HAVSTA Storage Cabinet","havsta-cabinet","ikea","Storage",18999,24999,"/products/ikea/havsta-cabinet.jpg","HAVSTA storage cabinet with a solid wood frame for durability and long life. The hinged doors have a soft-closing mechanism to prevent slamming.",false),
  p("i11","LISTERBY Coffee Table","listerby-coffee-table","ikea","Furniture",8999,12999,"/products/ikea/listerby-coffee-table.jpg","LISTERBY coffee table in solid oak veneer. The clean, rounded shape fits naturally into any room. The open shelf underneath provides extra storage.",false,true),
  p("i12","DRÖMSÄCK Gym Bag","dromsack-bag","ikea","Accessories",2499,3499,"https://picsum.photos/seed/ikea-drom-1/600/800","DRÖMSÄCK gym bag with a spacious main compartment and several pockets to keep your gym kit organised. Water-repellent material keeps contents dry.",false),
  p("i13","NYMÅNE Floor Lamp","nymane-floor-lamp","ikea","Lighting",9999,14999,"/products/ikea/nymane-floor-lamp.jpg","NYMÅNE floor/reading lamp with adjustable arm. You can direct the light exactly where you want it with the swivelling lamp head and extendable arm.",false),
  p("i14","SAMLA Storage Box","samla-box","ikea","Storage",599,999,"/products/ikea/samla-box.webp","SAMLA box is tough, durable and easy to stack. Made from recycled plastic. Transparent so you can see the contents. Lid sold separately.",false),
  p("i15","RIBBA Picture Frame","ribba-frame","ikea","Decor",999,1599,"/products/ikea/ribba-frame.jpg","RIBBA frame comes with a mount that can be cut so you can display many picture sizes. Place on a shelf or hang on a wall.",false),

  // OUR PRODUCTS (12)
  p("op1","bymoe Canvas Tote","bymoe-canvas-tote","our-products","Essentials",999,1599,"https://picsum.photos/seed/op-tote-1/600/800","Our signature heavy-duty canvas tote in natural. Reinforced handles and internal pocket. The everyday bag made beautifully.",true,true),
  p("op2","Ceramic Pour-Over Set","ceramic-pour-over","our-products","Essentials",2499,3999,"/products/our-products/ceramic-pour-over.jpg","A curated pour-over coffee set with ceramic dripper, carafe, and filters. Start your mornings right.",true,true),
  p("op3","Linen Notebook","linen-notebook","our-products","Essentials",799,1299,"/products/our-products/linen-notebook.jpg","A5 linen-covered notebook with dotted pages. 192 pages of premium 100gsm paper.",true),
  p("op4","Brass Card Holder","brass-card-holder","our-products","Limited Edition",1499,2299,"/products/our-products/brass-card-holder.jpg","Slim solid brass card holder with a brushed finish. Holds up to 12 cards. A refined everyday essential.",false),
  p("op5","Organic Cotton Pouch","organic-cotton-pouch","our-products","Essentials",699,1099,"/products/our-products/organic-cotton-pouch.jpg","Multi-use organic cotton pouch with zipper. Perfect for travel, makeup, or desk organisation.",false),
  p("op6","Soy Wax Candle","bymoe-soy-candle","our-products","Bestsellers",1299,1999,"/products/our-products/bymoe-soy-candle.jpg","Hand-poured soy wax candle in a reusable glass jar. Warm Amber & Oud fragrance. 40hr burn time.",true,true),
  p("op7","Terrazzo Coaster Set","terrazzo-coasters","our-products","Essentials",1199,1899,"/products/our-products/terrazzo-coasters.jpg","Set of 4 terrazzo resin coasters in pink speckle. Protect your surfaces in style.",false),
  p("op8","Leather Keychain","leather-keychain","our-products","Essentials",599,999,"/products/our-products/leather-keychain.webp","Vegetable-tanned leather keychain with brass ring. Personalise with your initials.",false),
  p("op9","Eucalyptus Diffuser","eucalyptus-diffuser","our-products","Bestsellers",1799,2799,"/products/our-products/eucalyptus-diffuser.png","Reed diffuser with natural eucalyptus and mint essential oils. Lasts up to 6 weeks.",false),
  p("op10","Woven Placemats Set","woven-placemats","our-products","Essentials",899,1399,"/products/our-products/woven-placemats.jpg","Set of 4 handwoven cotton placemats in natural. Machine washable and fade-resistant.",false),
  p("op11","Handmade Pottery Mug","pottery-mug","our-products","Limited Edition",1599,2499,"/products/our-products/pottery-mug.jpg","Hand-thrown stoneware mug with a speckled glaze. Each piece is unique. Microwave and dishwasher safe.",true),
  p("op12","Scented Room Spray","scented-room-spray","our-products","Bestsellers",999,1599,"/products/our-products/scented-room-spray.jpg","Alcohol-free room and linen spray. Fresh Linen & White Tea scent. 100ml recyclable bottle.",false),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  if (category === "best-sellers") return getFeaturedProducts();
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter((p) => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.inStock).slice(0, 8);
}

export function getIKEAProducts(): Product[] {
  return products.filter((p) => p.category === "ikea");
}

export function getOurProducts(): Product[] {
  return products.filter((p) => p.category === "our-products");
}
