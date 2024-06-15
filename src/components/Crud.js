import React, { Component } from 'react';
import { withRouter } from './Wrapper';
import { userSubmit } from '../redux/Action';
import { connect } from 'react-redux';

class Crud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                firstName: "",
                lastName: "",
                country: "",
                language: "",
                interests: [],
            },
            userDetailsdummy: {
                firstName: "",
                lastName: "",
                country: "",
                language: "",
                interests: [],
            },
            userData: [],
            Index: "",
        };
    }

    componentDidMount() {
        let id = this.props.params.id
        if (id) {
            this.setState({ userDetails: this.props.formData })
        }
        this.setState({
            userData: this.props.tableData
        })
    }

    handleChange = (e) => {
        if (e.target.type === "checkbox") {
            let interests = [...this.state.userDetails.interests];
            if (e.target.checked) {
                interests.push(e.target.value);
            }
            else {
                let id = interests.indexOf(e.target.value);
                interests.splice(id, 1);
            }
            this.setState({ userDetails: { ...this.state.userDetails, interests: [...interests] }, });
        } else {
            this.setState({ userDetails: { ...this.state.userDetails, [e.target.name]: e.target.value, }, });
        }
    }


    handleSubmit = () => {
        const { userData, userDetails, Index } = this.state;
        if (this.props.params.id) {
            userData[this.props.params.id] = userDetails;
            this.setState({ userData: userData, Index: "" }, () => {
                this.props.userDetailsSubmit(this.state.userData)
                this.props.navigate("/table")
            });
        } else {
            this.setState({ userData: [...userData, userDetails] }, () => {
                this.props.userDetailsSubmit(this.state.userData)
                this.props.navigate("/table")
            });
        }
        this.clearForm();
    };

    handleCancel = () => {
        this.setState({ userDetails: { ...this.state.userDetailsdummy } })
    }

    clearForm = () => {
        this.setState({
            userDetails: {
                firstName: "",
                lastName: "",
                country: "",
                language: "",
                interests: [],
            },
            Index: "",  
        });
    };

    render() {
        const { userDetails, Index } = this.state;
        const buttonText = Index !== "" ? "Update" : "Submit";
        return (
            <div className="container">
                <h3 className="alert alert-primary text-center">Contact Form</h3>
                <div className="employee-form">
                    <div className="form-group">
                        <label htmlFor="fname">First name :- </label>
                        <input type="text" className="form-control" name="firstName" id="fname" value={userDetails.firstName} onChange={this.handleChange} placeholder="Please enter your name..." />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lname">Last name :- </label>
                        <input type="text" className="form-control" name="lastName" id="lname" value={userDetails.lastName} onChange={this.handleChange} placeholder="Please enter your name..." />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country :- </label>
                        <select name="country" id="country" className="form-control" value={userDetails.country} onChange={this.handleChange}>
                            <option value="" disabled>Selected</option>
                            <option value="australia">Australia</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <p>Please select your favorite web language :-</p>
                        <div>
                            <input type="radio" name="language" id='html' value="HTML" checked={userDetails.language === "HTML"} onChange={(e) => this.handleChange(e)} />
                            <label for="html" className="ml-2">HTML</label><br />

                            <input type="radio" name="language" id='css' value="CSS" checked={userDetails.language === "CSS"} onChange={(e) => this.handleChange(e)} />
                            <label for="css" className="ml-2">CSS</label><br />

                            <input type="radio" name="language" id='javascript' value="javaScript" checked={userDetails.language === "javaScript"} onChange={(e) => this.handleChange(e)} />
                            <label for="javascript" className="ml-2">javaScript</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <p>Please select your interests :- </p>
                        <div>
                            <input type="checkbox" name="interests" id="interest1" value="Sports" checked={userDetails.interests.includes("Sports")} onChange={(e) => this.handleChange(e)} />
                            <label htmlFor="interest1" className="ml-2">Sports</label><br />

                            <input type="checkbox" name="interests" id="interest2" value="Music" checked={userDetails.interests.includes("Music")} onChange={(e) => this.handleChange(e)} />
                            <label htmlFor="interest2" className="ml-2">Music</label><br />

                            <input type="checkbox" name="interests" id="interest3" value="Movies" checked={userDetails.interests.includes("Movies")} onChange={(e) => this.handleChange(e)} />
                            <label htmlFor="interest3" className="ml-2">Movies</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="button" className="btn btn-primary mr-2" onClick={this.handleSubmit}>{buttonText}</button>
                        <button type="button" className="btn btn-danger" onClick={this.clearForm}><i className="fa fa-refresh fa-spin mr-1"></i> Reset</button>
                        {Index !== "" && (
                            <button type="button" className="btn btn-secondary ml-2" onClick={this.handleCancel}>Cancel</button>
                        )}
                    </div>
                </div>
            </div>
        );  
    }
}

const mapStateToprops = (state) => {
    return {
        formData: state?.editData,
        tableData: state?.data || [],
    };
};

const mapDispatchToprops = (dispatch) => {
    return {
        userDetailsSubmit: (data) => dispatch(userSubmit(data)),
    };
};

export default withRouter(connect(mapStateToprops, mapDispatchToprops)(Crud));  