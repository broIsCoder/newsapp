import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

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

    // to use sate must use contructor
    constructor(props) {      //think of it like functional component but split return feature with reander()
        super(props);         //must be called anyway

        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `News App - ${this.capitalize(this.props.category)}`;
    };

    componentDidMount() {
        this.fetchData();
    };

    //will fetch data as per page
    fetchData = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3775b0b478d40e098a7f7c12e36154a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response = await fetch(url);
        if (response.ok) {
            console.log('successfully fetched data :')
            console.log(response);
            const parsedData = await response.json();
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
            console.log('error fetching data' + response.status)
            console.log(response);
        };

    }
    // change page state and fetch data for previous page 
    previousPage = async () => {
        console.log('previous');
        console.log(this.state.page);
        await new Promise(resolve => {
            this.setState((prevState) => ({ page: prevState.page - 1 }), resolve);  // setSate is asyn function , but not return promise
        });
        console.log(this.state.page);
        this.fetchData();
    };

    // change page state and fetch data for next page 
    nextPage = async () => {
        console.log('next');
        console.log(this.state.page);
        await new Promise(resolve => {
            this.setState((prevState) => ({ page: prevState.page + 1 }), resolve);  // setSate is asyn function , but not return promise
        });
        console.log(this.state.page);
        this.fetchData();
    };

    capitalize = (word) =>{
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    render() {      // Renders jsx      
        const { category, heading } = this.props;
        const { loading, articles, page, totalResults } = this.state;
        const tag = category;

        let uniqueId = 0;
        return (
            <div className="p-5">
                <h3 className="text-light">
                    {heading} / {tag && this.capitalize(tag)}-{totalResults}
                </h3>
                {loading && <Spinner />}
                {totalResults===0 ?
                    <div className='text-warning w-100'>No News for Now</div> 
                    :
                    <>
                        <div className="row">
                            {!loading &&
                                articles.map(({ title, description, urlToImage, url, author, publishedAt, source }) => {
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
                        <div className="container d-flex justify-content-between">
                            <button disabled={page <= 0} onClick={this.previousPage} type="button" className="btn btn-dark">&larr; Previous</button>
                            <button disabled={this.page >= Math.ceil(this.totalResults / this.pageSize)} onClick={this.nextPage} type="button" className="btn btn-dark">Next &rarr;</button>
                        </div>
                    </>}
            </div>
        );
    }
}
