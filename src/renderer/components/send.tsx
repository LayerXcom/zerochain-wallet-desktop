import React from 'react';

interface ISendFormStates {
    address: string;
    amount: number;
}

class SendForm extends React.Component<{}, ISendFormStates> {
    private constructor(props: any) {
        super(props);
        this.state = {
            address: 'target address',
            amount: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Address:</label>
                <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                <label>Amount:</label>
                <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />

                <input type="submit" value="Submit" />
            </form>
        );
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        this.setState({...this.state, [name]: value});
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert('ts has submitted!!');
        event.preventDefault();
    }
}

export default class Send extends React.Component {
    public render() {
        return (
            <div>
                <h2>Send</h2>
                <SendForm />
            </div>
        );
    }
}
