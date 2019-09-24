import React from 'react';
import CurrentStatus from './current_status';
import SendForm from './form';

export default class Send extends React.Component {
    public render() {
        return (
            <div>
                <h1>Send</h1>
                <div className="row">
                    <div className="col-sm-7">
                        <SendForm />
                    </div>
                    <div className="col-sm-5">
                        <CurrentStatus />
                    </div>
                </div>
            </div>
        );
    }
}
