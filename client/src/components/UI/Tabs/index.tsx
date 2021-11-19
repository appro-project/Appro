import React, { Component, ReactChild, ReactElement } from 'react';

import classes from './Tabs.module.scss';

import Tab from './Tab';
interface ChildProps{
    label: string;
    children: ReactElement<ChildProps>[];
}
interface Props {
    children: ReactElement<ChildProps>[];
}

interface   State{
    activeTab: string;
}

class Tabs extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab: any) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { children } = this.props;
        const { activeTab } = this.state;
        let childToRender;
        if (activeTab === 'Всё о проекте') {
            childToRender = children;
        }else {
            childToRender = children.map((child, idx) => {
                if (child.props.label !== activeTab) return undefined;

                return child.props.children[idx];
            }).filter(child => child);
        }

        return (
            <div className={ classes.Tabs }>
                <ol className={ classes.TabsList }>
                    { children.map((child) => {
                        const { label } = child.props;

                        return (
                            <Tab
                                activeTab={ activeTab }
                                key={ label }
                                label={ label }
                                onClick={ this.onClickTabItem }
                            />
                        );
                    }) }
                </ol>
                <div className="tab-content">
                    { childToRender || null }
                </div>
            </div>
        );
    }
}

export default Tabs;
