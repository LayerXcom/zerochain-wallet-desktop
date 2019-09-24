import {
    History,
} from 'history';
import React from 'react';

interface IRecoveryProps {
    history: History
}

interface IRecoveryStates {
    mnemonics: Array<string>;
}

export default class Recovery extends React.Component<IRecoveryProps, IRecoveryStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            mnemonics: [...Array(12)].map(i => '')
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
                    <div className="input-group" style={{display: "inline-block"}}>
                        {
                            this.state.mnemonics.map((word, i) =>
                                <input
                                    type="text" name={i.toString()} value={word} key={i.toString()}
                                    onChange={this.handleChange} placeholder={(i+1).toString()}
                                    className='mnemonic'
                                />
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
        let mnemonics = this.state.mnemonics.slice()
        mnemonics[parseInt(name)] = value;
        this.setState({...this.state, mnemonics: mnemonics});
    }

    private async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            alert('submit mnemonics!');
        } catch (error) {
            alert(error.message);
        }
    }
}
