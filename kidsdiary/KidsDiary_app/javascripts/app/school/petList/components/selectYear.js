import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const yr_items = [];
for(let i = 0; i < 100 ; i++) {
    yr_items.push(<MenuItem value={ i } key={ i } primaryText={`${i+2000}`} />);
}

export default class DropDownSelYr extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 16 };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <DropDownMenu maxHeight={ 200 } value={ this.state.value } onChange={ this.handleChange }>
                { yr_items }
            </DropDownMenu>
        );
    }
}
