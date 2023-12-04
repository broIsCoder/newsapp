import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export default function News(props) {
    
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const [news, setNews] = useState(
        {
            articles:[],
            loading: true,
            page: 1,
            totalResults: 0
        }
    )
    useEffect(() => {
      fetchData();
    }, []) // run once at first
    
    document.title = `News App - ${capitalize(props.category)}`;
    
    //will fetch data as per page
    const fetchData = async () => {
        props.changeProgressBar(20);
        setNews((prevSate) => ({ ...prevSate, loading: true }))
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${news.page}&pageSize=${props.pageSize}`;     // mc
        let response = await fetch(url);
        props.changeProgressBar(30);
        if (response.ok) {
            console.log('successfully fetched data :')
            console.log(response);
            const parsedData = await response.json();
            props.changeProgressBar(60);
            console.log(parsedData)
            await setNews((prevSate) => ({
                ...prevSate,
                articles: parsedData.articles,
                loading: false,
                totalResults: parsedData.totalResults
            }));

            console.log("totalresutls:" + news.totalResults)
            if (news.totalResults <= 0) {
                console.log("No News For Today");

            }
        } else {
            console.log('error fetching data :' + response.status + " " + response.ok)
            console.log(response);
            setNews((prevSate) => ({ ...prevSate, loading: false }));
        };
        props.changeProgressBar(100);

    }

    const fetchMore = async () => {
        setNews((prevSate) => ({ ...prevSate, page: news.page + 1, loading: true }));  
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${news.page}&pageSize=${props.pageSize}`;     // mc
        try {
            let response = await fetch(url);
            if (response.ok) {
                console.log('successfully fetched data :')
                console.log(response);
                const parsedData = await response.json();
                console.log(parsedData)
                await setNews((prevSate) => ({
                    ...prevSate,
                    articles: [...news.articles, ...parsedData.articles],
                    loading: false,
                    totalResults: parsedData.totalResults,
                }));

                console.log("totalresutls:" + news.totalResults)
                if (news.totalResults <= 0) {
                    console.log("No News For Today");

                }
            } else {
                console.log(response);
                setNews((prevSate) => ({ ...prevSate, loading: false }));
                throw (response);
            };
        } catch (error) {
            console.log('An error occured:', error)
        }
    }

    const { category, heading } = props;
    const { loading, articles, totalResults } = news;
    const tag = category;

    let uniqueId = 0;

    return (
        <div className="p-5 container">
            <h3 className="text-light">
                {heading} / {tag && capitalize(tag)}-{totalResults}
            </h3>
            {loading && <Spinner />}

            {
                totalResults === 0 ?
                    loading || <h1 className='text-warning m-5'>No News for Now</h1>
                    :
                    <>
                        <InfiniteScroll
                            dataLength={articles.length}
                            next={fetchMore}
                            hasMore={articles.length <= totalResults}
                            loader={<Spinner key={"spinner-key"} />}
                            endMessage={
                                <h2 style={{ textAlign: 'center', padding: "10px" }}>
                                    <b className='text-white'>Yay! You have seen it all</b>
                                </h2>
                            }
                        >
                            <div className="container">
                                <div className="row">
                                    {articles.map(({ title, description, urlToImage, url, author, publishedAt, source }) => {
                                        if (title === '[Removed]') {
                                            return null; // Skip rendering
                                        }

                                        const imageUrl = urlToImage || '';
                                        const altText = 'Here is a Image';

                                        return (
                                            <div className="col-md-4" key={uniqueId++}>
                                                <NewsItem
                                                    title={title || '........'}
                                                    description={description || '................'}
                                                    urlImg={imageUrl}
                                                    alt={altText || "A Image"}
                                                    author={author || "Unknown"}
                                                    urlNews={url}
                                                    date={publishedAt || "Unknown Date"}
                                                    source={source.name}
                                                    style={{ backgroundColor: 'red', height: '100%' }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </InfiniteScroll>
                    </>
            }
        </div>
    );
};

News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
