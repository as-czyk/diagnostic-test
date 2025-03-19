export default function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <div>{id}</div>;
}
