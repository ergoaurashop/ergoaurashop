import { Product } from "@/lib/shopify/types";

export function ProductSpecs({ product }: { product: Product }) {
  // If product fields are exposed natively using our refactored types
  const material = product.material?.value;
  const dimensions = product.dimensions?.value;
  const warranty = product.warranty?.value;
  const origin = product.origin?.value;
  const assembly = product.assembly?.value;
  const hasSpecs = !!(material || dimensions || warranty || origin || assembly);

  return (
    <div className="mt-8 space-y-10">
      {/* Description */}
      {product.descriptionHtml && (
        <div className="prose prose-sm md:prose-base max-w-none text-ergo-text prose-headings:text-ergo-navy-deep prose-a:text-ergo-navy" 
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
        />
      )}

      {/* Specs Table */}
      {hasSpecs && (
        <div>
          <h3 className="text-xl font-bold text-ergo-navy-deep mb-4 font-sans tracking-tight">Specifications</h3>
          <div className="border border-ergo-border rounded-xl overflow-hidden bg-white">
            <table className="w-full text-sm md:text-base text-left">
              <tbody className="divide-y divide-ergo-border">
                {material && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th className="py-3 px-4 md:px-6 font-semibold bg-gray-50/50 w-1/3">Material</th>
                    <td className="py-3 px-4 md:px-6 font-medium text-ergo-muted">{material}</td>
                  </tr>
                )}
                {dimensions && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th className="py-3 px-4 md:px-6 font-semibold bg-gray-50/50 w-1/3">Dimensions</th>
                    <td className="py-3 px-4 md:px-6 font-medium text-ergo-muted">{dimensions}</td>
                  </tr>
                )}
                {warranty && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th className="py-3 px-4 md:px-6 font-semibold bg-gray-50/50 w-1/3">Warranty</th>
                    <td className="py-3 px-4 md:px-6 font-medium text-ergo-muted">{warranty}</td>
                  </tr>
                )}
                {origin && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th className="py-3 px-4 md:px-6 font-semibold bg-gray-50/50 w-1/3">Country of Origin</th>
                    <td className="py-3 px-4 md:px-6 font-medium text-ergo-muted">{origin}</td>
                  </tr>
                )}
                {assembly && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th className="py-3 px-4 md:px-6 font-semibold bg-gray-50/50 w-1/3">Assembly</th>
                    <td className="py-3 px-4 md:px-6 font-medium text-ergo-muted">{assembly}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
