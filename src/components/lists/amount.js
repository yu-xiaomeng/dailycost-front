import React from "react";

class Amount extends React.Component {
    
    render () {
        let amount;
        if (this.props.type === 'EXPENSE') {
            amount = (
                <span> { this.props.amount * -1 } </span>
            )
        } else if (this.props.type === 'INCOME') {
            amount = (
                <span style={{color: '#276203'}}> { this.props.amount } </span>
            )
        }
        return (
            <div className="amount"> {amount} </div>
        );
    }
}

export default Amount;