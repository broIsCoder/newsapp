import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, urlImg, urlNews, alt, author, date, source } = this.props;
        return (

            <div className="my-4" style={{position:"relative"}}>
                <span style={{ position: "absolute", top: "0", height:"100%",width:"100%",zIndex: "2",background: "linear-gradient(to bottom, rgba(0, 32, 67, 0.1) 55%, rgba(0,0,0,1) 75%)"}}></span>
                <div className="card bg-dark text-light" style={{ height: "550px",width:"100%", overflow: "hidden" }}>
                    <img style={{ maxHeight: "10rem", minHeight: "10rem", objectFit: 'cover', objectPosition: "top" }} src={urlImg ? urlImg : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Z4mlAMblevi1L-kJCL7MHwHaEW%26pid%3DApi&f=1&ipt=af062fceaf08dfaf4f3acb998025694cebe898306609c39613efc3528888193c&ipo=images"} className="card-img-top" alt={alt} />
                    <span className="bg-secondary rounded p-1" style={{ position: "absolute", top: "10px", right: "10px"}}>{source}</span>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <div style={{ position: 'absolute', bottom: "5px", zIndex: "3" ,padding:"10px"}}>
                            <p className='card-text'><small className='text-warning'>{author}</small><br /> <small className='text-secondary'>On {new Date(date).toGMTString()}</small></p>
                            {urlNews ?
                                <a href={urlNews} target='_blank' rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
                                : "..."
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
