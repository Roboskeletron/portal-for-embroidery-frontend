import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Header from "./components/Header.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";

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
                            <Route path="/profile" element={<h1>User Profile (Todo)</h1>}/>
                        </Routes>

                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App
