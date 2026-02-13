import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfinitePosts } from "../../api/postApi";
import { useAuthStore } from "../../store/AuthStore";
import { Searcher } from "../common/Searcher";
import Post from "./Post.tsx";

const PostGrid = () => {
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuthStore();
    const [searchTag, setSearchTag] = useState<string | null>(null);

    // 1. Fetch Data
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfinitePosts(searchTag);

    // 2. Handlers
    const handleSearch = (term: string) => {
        setSearchTag(term || null); // Empty string resets to null
    };

    const handleBack = () => {
        setSearchTag(null); // Clear filter
    };

    const handleCreateClick = () => {
        navigate("/posts/new"); // Use routing!
    };

    // 3. Loading/Error States
    if (status === 'pending') return <div className="text-center p-5">Loading posts...</div>;
    if (status === 'error') return <div className="text-center p-5 text-danger">Error: {error.message}</div>;

    return (
        <div className="container py-5 overflow-hidden">
            <h1 className="h4 fw-normal text-center mb-4">Designs {searchTag && `(Tag: #${searchTag})`}</h1>

            {/* Controls Header */}
            <div className="container pb-5">
                <div className="row g-3 align-items-center">
                    {/* Left Buttons */}
                    <div className="col-md-6 d-flex gap-2">
                        {searchTag && (
                            <button className="btn btn-outline-secondary" onClick={handleBack}>
                                Clear Search
                            </button>
                        )}

                        {/* Show "New Post" for Admins or Designers */}
                        {isAuthenticated && (role === "ADMIN" || role === "DESIGNER") && (
                            <button className="btn btn-success" onClick={handleCreateClick}>
                                New Post
                            </button>
                        )}
                    </div>

                    {/* Right Search */}
                    <div className="col-md-6">
                        <Searcher onSearch={handleSearch} placeholder="Search by Tag..." />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {data?.pages.map((page, i) => (
                        // React Fragment to handle array of arrays
                        <div key={i} style={{ display: 'contents' }}>
                            {page.viewDtoList?.map(post => (
                                <Post key={post.id} post={post} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {data?.pages[0]?.viewDtoList?.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        No posts found.
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
                <div className="px-2 py-5 text-center">
                    <button
                        className="btn btn-lg btn-outline-secondary px-5"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? (
                            <span><span className="spinner-border spinner-border-sm me-2"/>Loading...</span>
                        ) : (
                            "Load More"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostGrid;