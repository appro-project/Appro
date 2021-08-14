import React, { Component } from 'react';

interface Props{
    label: string;
    activeTab: string;
    onClick(label: string): void;
}

class Tab extends Component<Props, {}> {

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const { activeTab, label } = this.props;

        // let className = 'tab-list-item';
        //
        // if (activeTab === label) {
        //     className += ' tab-list-active';
        // }

        return (
            <li onClick={ this.onClick }>
                { label }
            </li>
        );
    }
}

export default Tab;
