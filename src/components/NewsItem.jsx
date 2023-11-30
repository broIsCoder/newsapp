import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, urlImg, urlNews ,alt , author ,date ,source} = this.props;
        return (

            <div className="my-3">
                <div className="card bg-dark text-light" style={{overflow:"hidden",minWidth:"7rem",background:"linear-gradient(to bottom, rgba(0, 0, 0,0) 40%, rgba(0, 32, 67,1) 99%)"}}>
                    <img style={{maxHeight:"250px",objectFit:'cover',objectPosition:"top"}} src={urlImg?urlImg:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Z4mlAMblevi1L-kJCL7MHwHaEW%26pid%3DApi&f=1&ipt=af062fceaf08dfaf4f3acb998025694cebe898306609c39613efc3528888193c&ipo=images"} className="card-img-top" alt={alt} />
                    <span className="bg-dark rounded p-1" style={{position:"absolute" ,top:"10px" ,right:"10px"}}>{source}</span>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-danger'>{author}</small><br/> <small className='text-secondary'>On {new Date(date).toGMTString()}</small></p>
                        {urlNews ?
                            <a href={urlNews} target='_blank' rel="noreferrer" className="btn btn-secondary btn-sm" >Read More</a>
                            : "..."
                        }
                    </div>
                </div>
            </div>

        )
    }
}
