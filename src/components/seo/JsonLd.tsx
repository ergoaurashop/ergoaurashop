// =====================================================================
// Generic JSON-LD Script Inserter
// Renders a <script type="application/ld+json"> tag with the provided
// schema object safely serialized.
// =====================================================================

type Props<T> = {
  schema: T;
  id?: string;
};

export default function JsonLd<T>({ schema, id }: Props<T>) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
