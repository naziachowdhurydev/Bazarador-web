// import Link from "next/link";
// import React from "react";

// interface Navs {
//   slug: string;
//   title: string;
//   nameBn: string;
//   icon: string;
// }

// const NavLinks = async () => {
//   const res = await fetch(
//     "https://api.abcz.workers.dev/api/bazardor/categories",
//     {
//       cache: "no-store",
//     },
//   );
//   const data = await res.json();
//   const navs: Navs[] = data.data;

//   return (
//     <div className=" flex gap-5 justify-center mt-5">
//       <Link className="hover:text-red-600" href="/">
//         হোম
//       </Link>

//       {navs.map((n, i) => (
//         <Link className="hover:text-red-600" href={n.slug} key={i}>
//           {n.nameBn}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default NavLinks;

import Link from "next/link";
import React from "react";

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
    <div className="mt-5 flex justify-center gap-5">
      {navs.map((n) => (
        <Link
          className="flex items-center gap-1 rounded-2xl hover:border hover:border-gray-300 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-gray-300"
          href={`/${n.slug}`}
          key={n.id}
        >
          <span>{n.icon}</span>
          <p>{n.nameBn}</p>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
