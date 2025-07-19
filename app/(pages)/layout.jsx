import Footer from "../components/footer";
import Header from "../components/header";

export default function Page({ children }) {
    return (
        <main className="p-5 md:p-10">
            <Header/>
        {children}
        <Footer/>
        </main>
    );
}