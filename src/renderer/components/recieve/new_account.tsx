import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface INewAccountStates {
    accountName: string;
    isOpen: boolean;
}

interface INewAccountProps {
    afterCreate: () => void;
}

export default class NewAccount extends React.Component<INewAccountProps, INewAccountStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            accountName: '',
            isOpen: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showForm = this.showForm.bind(this);
    }

    public render() {
        return (
            <div>
                {
                    !this.state.isOpen &&
                    <div>
                        <button className="btn btn-primary btn-sm" onClick={this.showForm}>
                            <i className="fas fa-plus"></i>
                        </button>
                        <span style={{marginLeft: '0.5rem'}}>create new address</span>
                    </div>
                }
                {
                    this.state.isOpen &&
                    <div>
                        <p>Input new account name.</p>
                        <form onSubmit={this.handleSubmit} className="form-inline">
                            <div className="form-group sm-8">
                                <input type="text" name="accountName" value={this.state.accountName}
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
            zfaceHelper.addAccount(this.state.accountName);
            this.setState({
                accountName: '',
                isOpen: false,
            });
            this.props.afterCreate();
        } catch (error) {
            alert(error.message);
        }
    }

    private showForm() {
        this.setState({
            isOpen: true,
        });
    }
}
