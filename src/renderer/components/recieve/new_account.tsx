import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface INewAccountStates {
    account_name: string;
    is_open: boolean;
}

interface INewAccountProps {
    after_create: () => void;
}

export default class NewAccount extends React.Component<INewAccountProps, INewAccountStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            account_name: '',
            is_open: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.show_form = this.show_form.bind(this);
    }

    public render() {
        return (
            <div>
                {
                    !this.state.is_open &&
                    <div>
                        <button className="btn btn-primary btn-sm" onClick={this.show_form}>
                            <i className="fas fa-plus"></i>
                        </button>
                        <span style={{marginLeft: '0.5rem'}}>create new address</span>
                    </div>
                }
                {
                    this.state.is_open &&
                    <div>
                        <p>Input new account name.</p>
                        <form onSubmit={this.handleSubmit} className="form-inline">
                            <div className="form-group sm-8">
                                <input type="text" name="account_name" value={this.state.account_name}
                                    onChange={this.handleChange} className="form-control" placeholder="account name" />
                            </div>
                            <input type="submit" value="Create" className="btn btn-primary sm-4" />
                        </form>
                    </div>
                }
            </div>
        );
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        this.setState({...this.state, [name]: value});
    }

    private async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            zfaceHelper.add_account(this.state.account_name);
            this.setState({
                account_name: '',
                is_open: false,
            });
            this.props.after_create();
        } catch (error) {
            alert(error.message);
        }
    }

    private show_form() {
        this.setState({
            is_open: true,
        });
    }
}