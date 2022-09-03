import React, { Component } from "react";
import Loader from "./../Common/Loader";
import url from "./man.png";

import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

import * as db from "../../firebase/db";
import * as analytics from "./../../analytics/analytics";

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        const defaultCategories = {
            "Food": "",
            "Automobile": "",
            "Entertainment": "",
            "Clothing": "",
            "Healthcare": "",
            "Travel": "",
            "Shopping":"",
            "Personal Care": "",
            "Investment": "",
            "Gifts & Donations": "",
            "Bills & Utilities": "",
            "Others": ""
        }

        this.state = {
            font: this.props.settings ? this.props.settings.font : "sans-serif",
            dataSaved: false,
            currency: this.props.settings
                ? this.props.settings.currency
                    ? this.props.settings.currency
                    : "Indian Rupees"
                : "Indian Rupees",
            monthLimit: this.props.settings
                ? this.props.settings.monthLimit
                    ? this.props.settings.monthLimit
                    : 15000
                : 15000,
            mode: this.props.settings ? this.props.settings.mode : "day",
            travelMode: this.props.settings
                ? this.props.settings.travelMode
                    ? this.props.settings.travelMode
                    : "off"
                : "off",
            fromCurrency: this.props.settings
                ? this.props.settings.fromCurrency
                    ? this.props.settings.fromCurrency
                    : "Indian Rupees"
                : "Indian Rupees",
            editedCategories: this.props.settings 
                ? this.props.settings.editedCategories 
                    ? {
                  //  "Food": this.props.settings.editedCategories["Food"] ? this.props.settings.editedCategories["Food"] : "",
                  //  "Automobile": this.props.settings.editedCategories["Automobile"] ? this.props.settings.editedCategories["Automobile"] : "",
                   // "Entertainment": this.props.settings.editedCategories["Entertainment"] ? this.props.settings.editedCategories["Entertainment"] : "",
                   // "Clothing": this.props.settings.editedCategories["Clothing"] ? this.props.settings.editedCategories["Clothing"] : "",
                 //   "Healthcare": this.props.settings.editedCategories["Healthcare"] ? this.props.settings.editedCategories["Healthcare"] : "",
                 //   "Travel": this.props.settings.editedCategories["Travel"] ? this.props.settings.editedCategories["Travel"] : "",
                    "Shopping":this.props.settings.editedCategories["Shopping"] ? this.props.settings.editedCategories["Shopping"] : "",
                    "Personal Care": this.props.settings.editedCategories["Personal Care"] ? this.props.settings.editedCategories["Personal Care"] : "",
                    "Investment": this.props.settings.editedCategories["Investment"] ? this.props.settings.editedCategories["Investment"] : "",
                    "Gifts & Donations": this.props.settings.editedCategories["Gifts & Donations"] ? this.props.settings.editedCategories["Gifts & Donations"] : "",
                    "Bills & Utilities": this.props.settings.editedCategories["Bills & Utilities"] ? this.props.settings.editedCategories["Bills & Utilities"] : "",
                    "Others": this.props.settings.editedCategories["Others"] ? this.props.settings.editedCategories["Others"] : ""
                }   : defaultCategories 
                : defaultCategories
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEditedCategories = this.handleChangeEditedCategories.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        db.doCreateSettingsForUser(
            this.props.user.uid,
            this.state.font,
            this.state.mode,
            this.state.currency,
            this.state.travelMode,
            this.state.fromCurrency,
            this.state.monthLimit,
            this.state.editedCategories
        );

        // reset form once saved
        // this.setState({ font: "Dhurjati", dataSaved: true, mode: "day" });
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleChangeEditedCategories(e) {
        let newEditedCategories = {};
        newEditedCategories[e.target.name] = e.target.value;
        this.setState({
            editedCategories: {
                ...this.state.editedCategories,
                ...newEditedCategories
            }
        })
    }

    componentDidMount() {
        analytics.initGA();
        analytics.logPageView();
    }

    render() {
        const userImage = {
            width: "200px",
            height: "200px",
            borderRadius: "15px",
            margin: "2% auto 0 auto",
            display: "block"
        };

        const center = {
            margin: "0 auto",
            display: "block"
        };
        if (this.props.settings && this.props.user && this.props.cards) {
            const styleFromSettings = {
                fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
                backgroundColor: this.props.settings
                    ? this.props.settings.mode === "night"
                        ? "#484842"
                        : "auto"
                    : "auto",
                minHeight: "91vh",
                padding: "2.33%"
            };

            const white = {
                color: this.props.settings ? (this.props.settings.mode === "night" ? "#fff" : "#000") : "#000"
            };

            const customLabel = {
                marginLeft: window.screen.width > 720 ? "-35%" : "0"
            };

            const centerHeight = {
                padding: "15px"
            };

            const test = {
                borderRadius: "10px",
                outline: "none"
            };

            const inputNightMode = { background: "#2c2b2b", color: "#a9a0a0", border: "1px solid #9b8c8cc7" };

            const inputDayMode = { background: "#fff", color: "#495057" };

          /*  const settingsHeader = {
                background: this.props.settings.mode === "night" ? "rgb(44, 43, 43)" : "#2b2b2",
                color: this.props.settings.mode === "night" ? "rgb(169, 160, 160)" : "#2b2b2",
                padding: "10px",
                border: "1px solid rgba(155, 140, 140, 0.78)",
                margin: "5% 5%",
                borderRadius: "15px",
                textAlign: "center"
            }; */

            return (
                <div className="container-fluid" style={styleFromSettings}>
                    <div className="row">
                        <div className="col-sm-6" style={centerHeight}>
                        <img src="https://quotefancy.com/media/wallpaper/3840x2160/3585903-Dan-Millman-Quote-Managing-your-money-does-not-depend-upon.jpg" alt="not found" width="650" height='559' /> 
                        </div>
                        <div className="col-sm-6" style={centerHeight}>
                            
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                <div className="col-sm-10 col-md-10 col-lg-44" style={center}>
                                    <div className="card card3" style={this.props.cards.card3}>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Hello {this.props.user.displayName || this.props.user.email}
                                            </h5>
                                            <hr />
                                            <p className="card-title">Registered Email : {this.props.user.email}</p>
                                            <hr />
                                            <p className="card-title">
                                                {this.props.user.emailVerified
                                                    ? ""
                                                    : ""}
                                            </p>
                                            <hr />
                                            <button classame="btn btn-default" style={test}>
                                                <Link to={routes.UPDATE_PASSWORD}> Update Password </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>



                                <div className="form-group row">
                                    <label className="col-sm-3 col-xs-6 col-form-label" style={white}>
                                        <span>Select Currency</span>
                                    </label>
                                    <div className="col-sm-9 col-xs-6">
                                        <select
                                            className="form-control"
                                            name="currency"
                                            value={this.state.currency}
                                            onChange={this.handleChange.bind(this)}
                                            style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                                        >
                                            <option value="Indian Rupees">Indian Rupees</option>
                                            <option value="US Dollars">US Dollars</option>
                                            <option value="Pounds">Pounds</option>
                                            <option value="Yen">Yen</option>
                                            <option value="Euro">Euro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-xs-6 col-form-label" style={white}>
                                        <span>Monthly Limit </span>
                                    </label>
                                    <div className="col-sm-9 col-xs-6">
                                        <input
                                            className="form-control"
                                            required
                                            type="number"
                                            name="monthLimit"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.monthLimit}
                                            style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-inline row">
                                    <label className="col-sm-3 col-xs-6 col-form-label" style={white}>
                                        <span style={customLabel}>Travel Mode</span>
                                    </label>
                                    <div
                                        className="col-sm-6 col-xs-6 switch-field"
                                        onChange={this.handleChange.bind(this)}
                                    >
                                        <input
                                            type="radio"
                                            name="travelMode"
                                            value="on"
                                            defaultChecked={this.state.travelMode === "on"}
                                            id="switch_left_travel"
                                        />
                                        <label for="switch_left_travel">On</label>
                                        <input
                                            type="radio"
                                            name="travelMode"
                                            value="off"
                                            defaultChecked={this.state.travelMode === "off"}
                                            id="switch_right_travel"
                                        />
                                        <label for="switch_right_travel">Off</label>{" "}
                                    </div>
                                    {this.state.travelMode === "on" ? (
                                        <div className="col-sm-6 col-xs-6" onChange={this.handleChange.bind(this)}>
                                            <span>
                                                <select
                                                    className="form-control"
                                                    name="fromCurrency"
                                                    value={this.state.fromCurrency}
                                                    onChange={this.handleChange.bind(this)}
                                                >
                                                    <option value="Indian Rupees">Indian Rupees</option>
                                                    <option value="US Dollars">US Dollars</option>
                                                    <option value="Pounds">Pounds</option>
                                                    <option value="Yen">Yen</option>
                                                    <option value="Euro">Euro</option>
                                                </select>
                                            </span>

                                            <span>
                                                {" "}
                                                <input
                                                    type="text"
                                                    style={{ width: "40px" }}
                                                    className="form-control"
                                                    value="to"
                                                    disabled
                                                />{" "}
                                            </span>
                                            <span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.currency}
                                                    disabled
                                                />
                                            </span>
                                        </div>
                                    ) : (
                                        <div />
                                    )}

                                    
                                </div>

                                

                                {this.state.dataSaved ? (
                                    <span className="bg-success success-msg"> Data saved successfully</span>
                                ) : (
                                    <span />
                                )}
                                <button className="btn btn-primary float-right" type="submit">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={url} style={userImage} alt="somethig's wrong" />
                                <div className="row">
                                    <div className="col-lg-10" style={center}>
                                        <div className="card card3">
                                            <div className="card-body">
                                                <h5 className="card-title">Hello User</h5>
                                                <hr />
                                                <p className="card-title">Getting your registered email</p>
                                                <hr />
                                                <p className="card-title">
                                                    {"we're checking wether you're a verified user"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default SettingsPage;
