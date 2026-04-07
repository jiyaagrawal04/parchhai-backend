// seed/seed.js - Populate the database with sample data
// Run: npm run seed

require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const Artisan = require('../models/Artisan');
const Product = require('../models/Product');

// Sample Artisans
const artisans = [
  {
    name: 'Ramji Bhai Khatri',
    region: 'Ajrakhpur, Kutch, Gujarat',
    craft_speciality: 'Ajrakh Block Printing',
    description: 'A seventh-generation Ajrakh artisan whose family has been practising this ancient resist-printing technique for over 300 years. Ramji Bhai uses natural dyes like indigo, pomegranate, and iron rust in a painstaking 16-step process to create geometric patterns inspired by the stars, rivers, and architecture of Sindh.',
    image: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600',
  },
  {
    name: 'Sameera Begum',
    region: 'Lucknow, Uttar Pradesh',
    craft_speciality: 'Chikankari Embroidery',
    description: 'Sameera learned Chikankari from her grandmother at age 12. Today she leads a cooperative of 40 women artisans in Old Lucknow, preserving over 36 traditional stitches that transform simple muslin into works of art.',
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600',
  },
  {
    name: 'Bhavna Devi',
    region: 'Bagru, Rajasthan',
    craft_speciality: 'Bagru Hand Block Print',
    description: 'Working from a sunlit courtyard in Bagru village, Bhavna Devi carves teak-wood blocks and prints cotton using clay resist and alizarin dyes. Her patterns draw from local flora like marigolds, mango leaves, and thorny acacias of the Thar.',
    image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=600',
  },
  {
    name: 'Lakshmi Amma',
    region: 'Pochampally, Telangana',
    craft_speciality: 'Ikat Handloom',
    description: 'Lakshmi Amma is a master weaver of Pochampally Ikat, a UNESCO-recognised craft where yarns are tie-dyed before weaving to create blurred, painterly patterns. Each saree takes 15 to 20 days on her pit loom.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600',
  },
  {
    name: 'Kala Ben',
    region: 'Bhuj, Kutch, Gujarat',
    craft_speciality: 'Bandhani (Tie-Dye)',
    description: 'Kala Ben ties thousands of tiny knots with her fingernails, each one a dot of resist, to create Bandhani patterns passed down through the Khatri community for centuries. A single dupatta may require over 5,000 knots.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
  },
];

// Sample Products (artisanIndex references the artisans array above)
const products = [
  {
    name: 'Indigo Ajrakh Short Kurti',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A deep indigo short kurti featuring traditional Ajrakh geometric patterns, printed using natural dyes on pure cotton. Cool, breathable, and rooted in craft.',
    craft_type: 'Ajrakh Block Print',
    artisanIndex: 0,
    story: 'This kurti was printed in Ajrakhpur using a 16-step process that dates back 4,000 years to the Indus Valley Civilization. The indigo comes from the Indigofera plant, the red from alizarin, and the black from rusted iron.',
    stock: 30,
  },
  {
    name: 'Madder Red Ajrakh Tunic',
    price: 2799,
    images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600'],
    sizes: ['S', 'M', 'L'],
    description: 'A vibrant madder-red tunic with symmetrical Ajrakh motifs. Perfect for festive evenings or cultural gatherings.',
    craft_type: 'Ajrakh Block Print',
    artisanIndex: 0,
    story: 'The red in this fabric comes from the roots of the Rubia plant, mixed with alum mordant. Ramji Bhai prints each panel by hand, aligning 8 carved blocks across 14 metres of cloth with nothing but muscle memory.',
    stock: 18,
  },
  {
    name: 'White Chikankari Kurti - Tepchi',
    price: 3299,
    images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An ivory-white short kurti with delicate Tepchi Chikankari embroidery on fine cotton. Minimalist luxury at its most refined.',
    craft_type: 'Chikankari',
    artisanIndex: 1,
    story: 'Tepchi is the foundational stitch of Chikankari, a running stitch worked on the wrong side of the fabric so only tiny, uniform dots appear on the surface. The collective embroiders each kurti over 3 days, following patterns drawn freehand in washable ink.',
    stock: 25,
  },
  {
    name: 'Sage Chikankari Kurta - Murri',
    price: 3899,
    images: ['https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=600'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A sage-green kurta with intricate Murri stitch Chikankari, tiny French-knot-like stitches that create a textured, raised surface.',
    craft_type: 'Chikankari',
    artisanIndex: 1,
    story: 'The Murri stitch takes its name from the Hindi word for grain. Each knot is barely 1mm wide, and a single motif on the yoke can contain over 200 knots. This is among the most complex Chikankari techniques.',
    stock: 12,
  },
  {
    name: 'Bagru Marigold Short Kurti',
    price: 1899,
    images: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600'],
    sizes: ['S', 'M', 'L'],
    description: 'A warm ochre kurti with hand-carved marigold block-print motifs from Bagru village. Dabu mud-resist technique creates the signature off-white patterns.',
    craft_type: 'Bagru Block Print',
    artisanIndex: 2,
    story: 'Bhavna Devi mixes black clay from the riverbed with gum and lime to create dabu, a resist paste. She applies it through a cloth screen, then dyes the fabric in alizarin. The result is a pattern born from the earth itself.',
    stock: 40,
  },
  {
    name: 'Thar Desert Thorn Tunic',
    price: 2199,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    sizes: ['M', 'L', 'XL'],
    description: 'A rust-and-cream kurti printed with the keekar (thorn tree) motif, an ode to the resilient desert flora of Western Rajasthan.',
    craft_type: 'Bagru Block Print',
    artisanIndex: 2,
    story: 'The thorn-tree motif is unique to Bagru. It represents resilience, the acacia survives on almost no water, just like the artisans who have kept this craft alive through droughts and industrial competition.',
    stock: 22,
  },
  {
    name: 'Pochampally Ikat Short Kurti',
    price: 3499,
    images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600'],
    sizes: ['S', 'M', 'L'],
    description: 'A vibrant double-ikat short kurti woven on a traditional pit loom. The characteristic bleeding edges give each diamond motif a watercolour softness.',
    craft_type: 'Ikat Handloom',
    artisanIndex: 3,
    story: 'In Pochampally Ikat, both the warp and weft threads are resist-dyed before weaving. Lakshmi Amma ties each thread bundle by hand, aligning colours across hundreds of threads. When the loom brings them together, the pattern appears like magic.',
    stock: 15,
  },
  {
    name: 'Bandhani Sunburst Kurti',
    price: 2699,
    images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A deep pomegranate-red kurti with a radial Shikari Bandhani pattern, thousands of tiny dots spiralling outward like sunbursts.',
    craft_type: 'Bandhani',
    artisanIndex: 4,
    story: 'Kala Ben ties each knot with her fingernail, no tool, no needle. The Shikari pattern contains over 6,000 knots per metre and takes a week to tie. After tying, the fabric is dipped in dye, creating the iconic dotted pattern of Kutch.',
    stock: 20,
  },
  {
    name: 'Amber Bandhej Tunic',
    price: 2399,
    images: ['https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=600'],
    sizes: ['S', 'M', 'L'],
    description: 'Golden amber silk-cotton blend with fine Bandhani dots across the bodice. A lighter take on traditional Bandhej, perfect for daytime occasions.',
    craft_type: 'Bandhani',
    artisanIndex: 4,
    story: 'This tunic uses ekdali, single-dot Bandhani where each knot produces a single, precise circle. The amber dye comes from turmeric and pomegranate rind, fixed with alum. Zero synthetic chemicals touch this cloth.',
    stock: 28,
  },
  {
    name: 'Midnight Ajrakh Patchwork Kurti',
    price: 3199,
    images: ['https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A contemporary patchwork kurti combining multiple Ajrakh print panels in indigo, madder, and black. Each piece is one-of-a-kind.',
    craft_type: 'Ajrakh Block Print',
    artisanIndex: 0,
    story: 'We collected off-cuts from printing sessions, no two pieces alike, and assembled them into this patchwork design. It is our tribute to zero-waste fashion and the happy accidents of handcraft.',
    stock: 10,
  },
];

// Seed function
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Artisan.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing artisans and products');

    // Insert artisans
    const createdArtisans = await Artisan.insertMany(artisans);
    console.log('Seeded ' + createdArtisans.length + ' artisans');

    // Map artisan indexes to actual ObjectIds and insert products
    const productsWithIds = products.map(function(p) {
      var obj = Object.assign({}, p);
      obj.artisan_id = createdArtisans[p.artisanIndex]._id;
      delete obj.artisanIndex;
      return obj;
    });

    const createdProducts = await Product.insertMany(productsWithIds);
    console.log('Seeded ' + createdProducts.length + ' products');

    console.log('\nDatabase seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seed();
