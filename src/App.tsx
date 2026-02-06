import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Header from "./components/Header/Header.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import Profile from "./components/Profile/Profile.tsx";
import Contacts from "./components/Contacts/Contacts.tsx";
import AboutUs from "./components/AboutUs/AboutUs.tsx";
import Footer from "./components/Footer/Footer.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/designs" element={<h1>Designs List (Todo)</h1>}/>
                            <Route path="/profile" element={<Profile />}/>
                            <Route path="/profile/:id" element={<Profile />}/>
                            <Route path="/contacts" element={<Contacts />}/>
                            <Route path="/about-us" element={<AboutUs />}/>
                        </Routes>
                        <Footer />
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App
