import Form from "./components/form.jsx";
import Listview from "./components/listView.jsx";

export default function Page(){
    return <main className="p-5 flex-col md:flex-row flex gap-5 ">
        
        <Form />
        <Listview/>
    </main>
}