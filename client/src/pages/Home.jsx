import React, { useState, useEffect} from 'react'

import { Loader, Card, FormField } from '../components';

const RenderCards = ({ data, title }) => {
    if(data?.length > 0) {
        return data.map((post) => <Card key={post._id} {...post} />)
    }

    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
}

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://hand-of-the-alchemist.onrender.com/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if(response.ok) {
                    const result = await response.json();

                    setAllPosts(result.data.reverse());
                }
            } catch (error) {
                alert('RELOAD THE PAGE TO AWAKEN THE SERVER')
            } finally {
                setLoading(false)
            }
        }

        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

                setSearchedResults(searchResults);
            }, 500)
        );
    }

    return (
        <section className="max-w-7xl mx-auto">
            <div class="scanline"></div>
            <div>
                <h1 className="font-bold text-[#4bc45b] text-[34px] pt-[4rem] line10">IMAGE NEXUS ARCHIVES</h1>
                {/* <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">Welcome to Hand of the Alchemist, where thoughts become reality. Browse through a collection of imaginative and visually stunning images transmuted by The Alchemist or have one transmuted for yourself.</p> */}
            </div>
        <div class="anim-box-archive">
            <div class="btn-box">
            <div className="mt-6">
                <FormField
                    labelName=""
                    type="text"
                    name="text"
                    placeholder="SEARCH ARCHIVE"
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

        <a href="./Create-post" class="btn mt-6">GENERATE</a>
        
        </div>

            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                    {searchText && (
                        <h2 className="font-medium text-[#666e75] text-xl mb-3">
                            Showing results for <span className="text-[#222328]">
                                {searchText}
                            </span>
                        </h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText ? (
                            <RenderCards
                            data={searchedResults}
                            title="No search results found" 
                            />
                        ) : (
                            <RenderCards 
                            data={allPosts}
                            title="No posts found"
                            />
                        )}
                    </div>
                    </>
                )}
            </div>
            </div>
        </section>
  )
}

export default Home