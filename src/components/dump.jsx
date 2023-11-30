
return (
    <div className='p-5'>
        
        <h3 className='text-light'>{this.props.heading} / {tag.charAt(0).toUpperCase() + tag.slice(1)}</h3>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {/* {!this.state.loading && this.state.articles.map(({ title, description, urlToImage, url }) => { */}
            {!this.state.loading && this.state.articles.map(({ title, abstract, multimedia, url ,byline}) => {
                
                return (title === '[Removed]' ?
                "" 
                :
                (<div className="col-md-4" key={url} >
                    {/* <NewsItem title={title ? title : "........."} description={description ? description : "................"} urlImg={urlToImage} urlNews={url} style={{ backgroundColor: "red", heigth: "100%" }} /> */}
                    <NewsItem title={title ? title : "........"} description={abstract ? abstract : "................"} urlImg={multimedia ?( multimedia[0]?multimedia[0].url : '' ): ''} alt={multimedia[0].caption} author={byline} urlNews={url} style={{ backgroundColor: "red", heigth: "100%" }} />
                </div>))
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 0} onClick={this.previousPage} type="button" className="btn btn-dark">&larr; Previous</button>
            {/* <button disabled={this.state.page>= Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.nextPage} type="button" className="btn btn-dark">Next &rarr;</button> */}
            <button disabled={this.state.page >= this.props.categories.length} onClick={this.nextPage} type="button" className="btn btn-dark">Next &rarr;</button>
        </div>
    </div>
)