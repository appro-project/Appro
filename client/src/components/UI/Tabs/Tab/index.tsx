import React, { Component } from 'react';

import classes from './Tab.module.scss';

interface Props {
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

        const classNames = [classes.Tab];

        if (activeTab === label) {
            classNames.push(classes.Tab__Active);
        }

        return (
            <li className={ classNames.join(' ') } onClick={ this.onClick }>
                { label }
            </li>
        );
    }
}

export default Tab;
