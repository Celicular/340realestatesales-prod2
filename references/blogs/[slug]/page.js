import pool from "@/lib/db";
import BlogReaderClient from "./BlogReaderClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  let title = "Real Estate Blog | 340 Real Estate St. John USVI";
  let description = "Stay updated with the latest news, market trends, and island lifestyle tips from St. John's premier real estate brokerage.";
  let ogImage = "https://340realestate.com/assets/logo.png";

  try {
    const { rows } = await pool.query(
      "SELECT title, excerpt, cover_image FROM blogs WHERE slug = $1 AND status = 'published'",
      [slug]
    );

    if (rows && rows.length > 0) {
      const b = rows[0];
      title = `${b.title} | 340 Real Estate Blog`;
      if (b.excerpt) description = b.excerpt.substring(0, 160);
      if (b.cover_image) ogImage = b.cover_image.startsWith('http') ? b.cover_image : `https://340realestate.com${b.cover_image}`;
    }
  } catch (error) {
    console.error("Blog Metadata Error:", error);
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://340realestate.com/blogs/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    }
  };
}

export default function BlogPage() {
  return <BlogReaderClient />;
}
