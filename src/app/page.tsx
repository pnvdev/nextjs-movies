import { Movies } from "@/components/Movies";
interface HomePageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Home({ searchParams }: HomePageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-gray-100">
      <Movies searchParams={searchParams} />
    </main>
  );
}
