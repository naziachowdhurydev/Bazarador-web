import CategoryNavItems from "./CategoryNavItems";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Navs[] = await res.json();

  return (
    <nav className="mx-auto mt-4 w-full max-w-7xl px-3 sm:mt-5 sm:px-4">
      <CategoryNavItems items={navs} />
    </nav>
  );
};

export default NavLinks;
