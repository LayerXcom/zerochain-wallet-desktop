import {
    History,
} from 'history';
import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface IRecoveryProps {
    history: History;
}

interface IRecoveryStates {
    mnemonics: string[];
}

export default class Recovery extends React.Component<IRecoveryProps, IRecoveryStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            mnemonics: [...Array(12)].map((i) => ''),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public render() {
        return (
            <div>
                <h1>Recovery</h1>
                <p>Input mnemonic to the below form.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        {
                            this.state.mnemonics.map((word, i) =>
                                <input
                                    type="text" name={i.toString()} value={word} key={i.toString()}
                                    onChange={this.handleChange} placeholder={(i + 1).toString()}
                                    className="mnemonic"
                                />,
                            )
                        }
                    </div>
                    <input type="submit" value="Recover Wallet" className="btn btn-primary" />
                </form>

                <button
                    onClick={() => this.props.history.goBack()}
                    className="btn btn-link">
                        back to menu
                </button>
            </div>
        );
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        const mnemonics = this.state.mnemonics.slice();
        mnemonics[parseInt(name, 10)] = value;
        this.setState({...this.state, mnemonics});
    }

    private async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const message = 'Do you really want to recover wallet? Recovering wallet will delete existing local wallets.';
        const confirmation = window.confirm(message);
        if (confirmation) {
            try {
                zfaceHelper.recover(this.state.mnemonics);
            } catch (error) {
                alert(error.message);
            }
        }
        event.preventDefault();
    }
}
