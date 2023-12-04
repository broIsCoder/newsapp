import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    //static is property of class itself 
    //this is instance of class
    static defaultProps = {
        category: 0,
    }
    static propTypes = {
        category: PropTypes.number,
    }
    articles = [];

    // to use sate must use contructor
    constructor(props) {      //think of it like functional component but split return feature with reander()
        super(props);         //must be called anyway

        this.state = {
            articles: this.articles,
            loading: true,
            page: this.props.category,
            // page: 1
            // totalResult:0
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    //will fetch data as per page
    fetchData = async () => {
        this.setState({ loading: true })
      
        let url = `https://api.nytimes.com/svc/topstories/v2/${this.props.categories[this.state.page] || "home"}.json?api-key=${this.props.apiKey}`;
        let response = await fetch(url);
        if (response.ok) {
            console.log('successfully fetched data :')
            console.log(response);
            const parsedData = await response.json();
            console.log(parsedData)
            await this.setState({
                articles: parsedData.results,
                loading: false,
                totalResults: parsedData.num_results
            });
        } else {
            console.log('error fetching data')
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


    render() {      // Renders jsx      
        const { categories, heading } = this.props;
        const { loading, articles, page, totalResults } = this.state;
        const tag = categories[this.state.page];

        let uniqueId = 0;
        return (
            <div className="p-5">
                <h3 className="text-light">
                    {heading} / {tag && tag.charAt(0).toUpperCase() + tag.slice(1)}-{totalResults}
                </h3>
                {loading && <Spinner />}
                {totalResults === 0 ? <div className='text-warning'>No News for Now</div> :
                <>
                    <div className="row">
                              {!loading &&
                            articles.map(({ title, abstract, multimedia, url, byline, updated_date }) => {
                                if (title === '[Removed]') {
                                    return null; // Skip rendering
                                }
                                const imageUrl = multimedia && multimedia[0] && multimedia[0].url ? multimedia[0].url : '';
                                const altText = multimedia && multimedia[0] ? multimedia[0].caption : '';
                                const source = '';

                                return (
                                    <div className="col-md-4" key={uniqueId++}>
                                        <NewsItem
                                            title={title || '........'}
                                            description={abstract || '................'}
                                            urlImg={imageUrl}
                                            alt={altText || "A Image"}
                                            author={byline || "Unknown"}
                                            urlNews={url}
                                            date={updated_date || "Unknown Date"}
                                            source={source}
                                            style={{ backgroundColor: 'red', height: '100%' }}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="container d-flex justify-content-between">
                       <button disabled={page === 0} onClick={this.previousPage} type="button" className="btn btn-dark">
                            &larr; Previous
                        </button>
                        <button disabled={page >= categories.length} onClick={this.nextPage} type="button" className="btn btn-dark">
                            Next &rarr;
                        </button>
                    </div>
                </>}
            </div>
        );
    }
}
