import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Header from "./components/header/Header.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Profile from "./components/profile/Profile.tsx";
import Contacts from "./components/contacts/Contacts.tsx";
import AboutUs from "./components/AboutUs/AboutUs.tsx";
import Footer from "./components/footer/Footer.tsx";
import PostGrid from "./components/posts/PostGrid.tsx";
import PostCreateForm from "./components/posts/PostCreateForm.tsx";
import PostProfile from "./components/posts/PostProfile.tsx";

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
                            <Route path="/designs" element={<PostGrid />} />
                            <Route path="/designs/:postId" element={<PostProfile />} />
                            <Route path="/my-designs" element={<PostGrid />} />
                            <Route path="/profile" element={<Profile />}/>
                            <Route path="/profile/:id" element={<Profile />}/>
                            <Route path="/contacts" element={<Contacts />}/>
                            <Route path="/about-us" element={<AboutUs />}/>
                            <Route path="/posts/new" element={<PostCreateForm />} />
                        </Routes>
                        <Footer />
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App
