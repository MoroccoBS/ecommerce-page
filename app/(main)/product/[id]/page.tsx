type Props = {
  params: { id: string };
};

export default function page({ params }: Props) {
  //   const product = getProductBySlug(slug);
  console.log(`${params.id} page`);
  return <div>page {params.id}</div>;
}
