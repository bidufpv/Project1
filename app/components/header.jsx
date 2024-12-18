import Link from "next/link";

export default function Header() {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
  ];

  return (
    <nav className=" flex flex-wrap item-center hover:text-slate-700 font-normal
     justify-between py-3 px-4 sm:px-6 lg:px-1 border-b">
      <img className="h-10 w-14" src="/logo.jpg" alt="" />
      <div className="flex gap-4 items-center">

        {menuList?.map((item, index) => (

          <Link key={index} href={item?.link}>
            <button>{item?.name}</button>
          </Link>

        ))}

      </div>
      <div className="flex flex-row justify-center gap-5 overflow-hidden">
      <Link href={'/signin'}>
      <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-2xl text-white">Sign-In</button>
      </Link>
      <Link href={'/signup'}>
      <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-2xl text-white">Sign-Up</button>
      </Link>
      </div>
    </nav>
  );
}
