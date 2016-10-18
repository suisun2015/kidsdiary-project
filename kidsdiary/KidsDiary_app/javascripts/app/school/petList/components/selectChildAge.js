import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const age_items = [];
for(let i = 1; i < 8 ; i++) {
    age_items.push(<MenuItem value={ i } key={ i } primaryText={`${i}際児`} />);
}

export default class DropDownSelChildAge extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <DropDownMenu maxHeight={ 200 } value={ this.state.value } onChange={ this.handleChange }>
                { age_items }
            </DropDownMenu>
        );
    }
}
