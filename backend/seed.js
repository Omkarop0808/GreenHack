require('dotenv').config();
const mongoose = require('mongoose');
const { User, PurchaseHistory } = require('./db');
const Post = require('./models/Post');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding...");

    // 1. Get or create a User
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        username: "demo_user@example.com",
        password: "password123",
        firstName: "Demo",
        lastName: "User",
      });
      console.log("Created demo user:", user._id);
    } else {
      console.log("Using existing user:", user._id);
    }

    // 2. Clear existing Posts and PurchaseHistory
    await Post.deleteMany({});
    await PurchaseHistory.deleteMany({});
    console.log("Cleared old data.");

    // 3. Create Demo Purchase History
    const purchases = [
      {
        userId: user._id.toString(),
        purchaseDate: new Date('2023-10-01'),
        purchased: { product: "Plastic Water Bottle", eco_score: 2, water_usage: 10, carbon_footprint: 5, waste_generated: 1 },
        alternative: { product: "Reusable Steel Flask", eco_score: 9, water_usage: 2, carbon_footprint: 1, waste_generated: 0 }
      },
      {
        userId: user._id.toString(),
        purchaseDate: new Date('2023-10-05'),
        purchased: { product: "Fast Fashion T-Shirt", eco_score: 3, water_usage: 50, carbon_footprint: 12, waste_generated: 3 },
        alternative: { product: "Organic Cotton T-Shirt", eco_score: 8, water_usage: 15, carbon_footprint: 4, waste_generated: 1 }
      },
      {
        userId: user._id.toString(),
        purchaseDate: new Date('2023-10-12'),
        purchased: { product: "Single-Use Coffee Cup", eco_score: 1, water_usage: 5, carbon_footprint: 2, waste_generated: 1 },
        alternative: { product: "Bamboo Coffee Mug", eco_score: 9, water_usage: 1, carbon_footprint: 0.5, waste_generated: 0 }
      }
    ];
    await PurchaseHistory.insertMany(purchases);
    console.log("Inserted 3 PurchaseHistory records.");

    // 4. Create Demo Posts
    const posts = [
      {
        title: "My first step towards zero waste!",
        content: "I finally switched to a reusable bamboo coffee mug. Small steps matter. It keeps my coffee warm and the planet green!",
        image_url: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800",
        creator: user._id
      },
      {
        title: "Eco-friendly Grocery Shopping",
        content: "Brought my own tote bags today and avoided 5 plastic bags. Every bit helps!",
        image_url: "https://images.unsplash.com/photo-1592842416744-f187a552e6d6?auto=format&fit=crop&q=80&w=800",
        creator: user._id
      },
      {
        title: "Thrifting find of the day",
        content: "Instead of buying fast fashion, I found this amazing vintage jacket at the local thrift store. Reduce, reuse, recycle!",
        image_url: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=800",
        creator: user._id
      }
    ];
    await Post.insertMany(posts);
    console.log("Inserted 3 Post records.");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
