import React, { Component, ReactElement } from 'react';
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

        return (
            <div className="tabs">
                <ol className="tab-list">
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
                    { children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;

                        return child.props.children;
                    }) }
                </div>
            </div>
        );
    }
}

export default Tabs;
