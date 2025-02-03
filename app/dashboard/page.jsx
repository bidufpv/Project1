import Link from "next/link";

export default function page(){
 return <main className=" ">
    <h1>Dashboard</h1>
    <Link href={'/admin'}>
    Admin Panel
    </Link>
 </main>   
}