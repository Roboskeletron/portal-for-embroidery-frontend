import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Header from "./components/Header/Header.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import Profile from "./components/Profile/Profile.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <div className="App">
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/designs" element={<h1>Designs List (Todo)</h1>}/>
                            <Route path="/profile" element={<Profile />}/>
                            <Route path="/profile/:id" element={<Profile />}/>
                        </Routes>

                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App
