import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    activeOption = (e) => {
        document.querySelectorAll(".nav-link").forEach(element => {
            element.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {this.props.categories.map((e) => (
                                <li className="nav-item" key={e}>
                                    <Link
                                        to={`/${e}`}
                                        className="nav-link"
                                        aria-current="page"
                                        onClick={this.activeOption}
                                    >
                                        {e.charAt(0).toUpperCase() + e.slice(1)}
                                    </Link>
                                </li>
                            ))}
                            <li className="nav-item">
                                <Link className="nav-link" to="/">About Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
