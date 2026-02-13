import { useState, type FormEvent } from "react";

interface Props {
    onSearch: (term: string) => void;
    placeholder?: string;
}

export const Searcher = ({ onSearch, placeholder }: Props) => {
    const [term, setTerm] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder={placeholder || "Search"}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
};