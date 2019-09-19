import React from 'react';

export default class Recieve extends React.Component {
    public render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Recieve</h1>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>default</td>
                                    <td>5CfUk1yfBAhMZvMyHCsuy93fGUxLGSm8BLFesNxqaygtuLoE</td>
                                    <td><i className="far fa-copy fa-lg"></i></td>
                                </tr>
                                <tr>
                                    <td>sub_address</td>
                                    <td>5CfUk1yfBAhMZvMyHCsuy93fGUxLGSm8BLFesNxqaygtuLoE</td>
                                    <td><i className="far fa-copy fa-lg"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
