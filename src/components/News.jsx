import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export default class News extends Component {
    //static is property of class itself 
    //this is instance of class
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    articles = [];

    // to use state must use contructor
    constructor(props) {      //think of it like functional component as it takes props and  reander() return DOM after it .
        super(props);         //must be called anyway

        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `News App - ${this.capitalize(this.props.category)}`;
    };

    // after render() , fetch data
    componentDidMount() {
        this.fetchData();
    };

    //will fetch data as per page
    fetchData = async () => {
        this.props.setProgress(20);
        this.setState({ loading: true })
        // let url = `https://newsapi.org/v2/top-headlines?count/ry=${this.props.country}&category=${this.props.category}&apiKey==${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;     // a
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;     // mc
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;     //safal
       let response = await fetch(url);
        this.props.setProgress(30);
        if (response.ok) {
            console.log('successfully fetched data :')
            console.log(response);
            const parsedData = await response.json();
            this.props.setProgress(60);
            console.log(parsedData)
            await this.setState({
                articles: parsedData.articles,
                loading: false,
                totalResults: parsedData.totalResults
            });
            
            console.log("totalresutls:" + this.state.totalResults)
            if (this.state.totalResults <= 0) {
                console.log("No News For Today");
                
            }
        } else {
            console.log('error fetching data :' + response.status + " " + response.ok)
            console.log(response);
            this.setState({ loading: false })
        };
        this.props.setProgress(100);

    }

    fetchMore = async () => {
        this.setState({ page: this.state.page + 1, loading: true });
        // let url = `https://newsapi.org/v2/top-headlines?count/ry=${this.props.country}&category=${this.props.category}&apiKey==${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;     // a
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;     // mc
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;     //safal
        try {
            let response = await fetch(url);
            if (response.ok) {
                console.log('successfully fetched data :')
                console.log(response);
                const parsedData = await response.json();
                console.log(parsedData)
                await this.setState({
                    articles: [...this.state.articles, ...parsedData.articles],
                    loading: false,
                    totalResults: parsedData.totalResults
                });

                console.log("totalresutls:" + this.state.totalResults)
                if (this.state.totalResults <= 0) {
                    console.log("No News For Today");

                }
            } else {
                console.log(response);
                this.setState({ loading: false });
                throw (response);
            };
        } catch (error) {
            console.log('An error occured:', error)
        }
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    render() {      // Render DOM  after constructor
        const { category, heading } = this.props;
        const { loading, articles, totalResults } = this.state;
        const tag = category;

        let uniqueId = 0;
        return (
            <div className="p-5 container">
                <h3 className="text-light">
                    {heading} / {tag && this.capitalize(tag)}-{totalResults}
                </h3>
                {loading && <Spinner />}

                {
                    totalResults === 0 ?
                        loading || <h1 className='text-warning m-5'>No News for Now</h1>
                        :
                        <>
                            <InfiniteScroll
                                dataLength={articles.length}
                                next={this.fetchMore}
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
    }
}
