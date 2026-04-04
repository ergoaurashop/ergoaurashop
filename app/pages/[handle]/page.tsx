import { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopifyFetch, GET_ALL_PAGES, GET_SHOPIFY_PAGE } from "@/lib/shopify";
import { ShopifyPage } from "@/lib/shopify/pages";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const data = await shopifyFetch<{ pages: { edges: { node: { handle: string } }[] } }>({
      query: GET_ALL_PAGES
    });
    return data.pages.edges.map(e => ({ handle: e.node.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  try {
    const data = await shopifyFetch<{ page: ShopifyPage | null }>({
      query: GET_SHOPIFY_PAGE,
      variables: { handle },
    });
    
    if (!data.page) return {};
    
    return {
      title: `${data.page.seo.title || data.page.title} | ErgoAura`,
      description: data.page.seo.description || data.page.bodySummary,
    };
  } catch {
    return {};
  }
}

export default async function ShopifyCMSPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  
  const data = await shopifyFetch<{ page: ShopifyPage | null }>({
    query: GET_SHOPIFY_PAGE,
    variables: { handle },
  });

  const page = data.page;

  if (!page) {
    notFound();
  }

  return (
    <div className="w-full bg-white font-sans min-h-[60vh] py-16 md:py-24 selection:bg-ergo-navy selection:text-white">
      <article className="max-w-4xl mx-auto px-4 md:px-8">
        <header className="mb-12 border-b border-ergo-border pb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-ergo-navy-deep tracking-tighter mb-4">
            {page.title}
          </h1>
          <p className="text-xs font-bold text-ergo-muted uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
            Last Updated
            <span className="bg-ergo-surface px-2 py-1 rounded text-ergo-navy-deep">
              {new Date(page.updatedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </p>
        </header>

        <div 
          className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-ergo-navy-deep prose-headings:tracking-tight prose-a:text-ergo-navy prose-a:font-bold prose-strong:text-ergo-navy-deep prose-p:text-ergo-text prose-p:font-medium prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.body }} 
        />
      </article>
    </div>
  );
}
