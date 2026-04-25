import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB084", // Chalky Orange
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      { name: "Entrepreneurship", slug: "entrepreneurship" },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      { name: "Marketing & Sales", slug: "marketing-sales" },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#90DBF4", // Chalky Light Blue
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D0BFFF", // Chalky Lavender
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Education",
    color: "#FDE270", // Chalky Yellow
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#98F5E1", // Chalky Seafoam
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FFADAD", // Chalky Coral Red
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#BDB2FF", // Chalky Periwinkle
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFD6A5", // Chalky Apricot
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#CAFFBF", // Chalky Lime Green
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FFC6FF", // Chalky Pink
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
  {
    name: "Templates & Tools",
    color: "#A0C4FF", // Chalky Cornflower
    slug: "templates-tools",
    subcategories: [
      { name: "Notion Templates", slug: "notion-templates" },
      { name: "Resume Templates", slug: "resume-templates" },
      { name: "Business Templates", slug: "business-templates" },
      { name: "Canva Kits", slug: "canva-kits" },
      { name: "Spreadsheets", slug: "spreadsheets" },
    ],
  },
  {
    name: "Video & Editing",
    color: "#9BF6FF", // Chalky Cyan
    slug: "video-creative",
    subcategories: [
      { name: "Video Editing", slug: "video-editing" },
      { name: "Motion Graphics", slug: "motion-graphics" },
      { name: "Premiere Pro", slug: "premiere-pro" },
      { name: "After Effects", slug: "after-effects" },
    ],
  },
  {
    name: "Marketing",
    color: "#FDFFB6", // Chalky Pale Yellow
    slug: "marketing",
    subcategories: [
      { name: "Social Media", slug: "social-media" },
      { name: "SEO", slug: "seo" },
      { name: "Email Marketing", slug: "email-marketing" },
      { name: "Brand Strategy", slug: "brand-strategy" },
    ],
  },
  {
    name: "Lifestyle",
    color: "#FFD166", // Chalky Mustard
    slug: "lifestyle",
    subcategories: [
      { name: "Habits", slug: "habits" },
      { name: "Journaling", slug: "journaling" },
      { name: "Mindset Coaching", slug: "mindset-coaching" },
      { name: "Personal Planning", slug: "personal-planning" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seeding completed successfully");
  process.exit(0);
} catch (error) {
  console.error("Error during seeding:", error);
  process.exit(1);
}
