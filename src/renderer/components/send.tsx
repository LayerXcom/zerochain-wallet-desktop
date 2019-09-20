import React from 'react';
import * as zfaceHelper from '../zface_helper';

interface ISendFormStates {
    address: string;
    amount: number;
}

export default class Send extends React.Component<{}, ISendFormStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            address: '',
            amount: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Send</h1>
                        <div className="row">
                            <div className="col-sm-7">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Address:</label>
                                        <input type="text" name="address" value={this.state.address}
                                            onChange={this.handleChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount:</label>
                                        <input type="text" name="amount" value={this.state.amount}
                                                onChange={this.handleChange} className="form-control" />
                                    </div>
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                </form>
                            </div>
                            <div className="col-sm-5">
                                <div className="card">
                                    <div className="card-body">
                                        <span className="small">Current Balance:</span>
                                        <p className="font-weight-bold">120ZLX</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        if (name === 'amount') {
            this.setState({...this.state, [name]: parseFloat(value)});
        } else {
            this.setState({...this.state, [name]: value});
        }
    }

    private async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            zfaceHelper.submit_tx(this.state.address, this.state.amount);
        } catch (error) {
            alert(error.message);
        }
    }
}
