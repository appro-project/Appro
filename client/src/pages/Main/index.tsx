import React from 'react';
import Welcome from './Welcome';
import Popular from './Popular';
import Principles from './Principles';
import Feedback from './Feedback';
import About from './About';
import {compose} from "redux";
import {connect} from "react-redux";
import {getPopularCategories, getPrinciplesData, getProjects, RootState} from "../../reducers";
import {Project} from "../../entity/Project";
import {ReactComponent as SliderPrev} from "../../assets/img/main/welcome/slider-prev.svg";
import {ReactComponent as SliderNext} from "../../assets/img/main/welcome/slider-next.svg";
import {Slide} from "../../entity/Slide";
import {PopularCategoryData} from "../../entity/PopularCategoryData";
import {PrincipleItemData} from "../../entity/PrincipleItemData";

interface StateProps {
    mockProjects: Project[];
    popularCategories: PopularCategoryData[];
    principlesData: PrincipleItemData[];
}

type PropsType = StateProps;

class Index extends React.Component<PropsType, {}> {

    sliderProps: Slide = () => ({
        renderArrowPrev: this.renderArrowPrev,
        renderArrowNext: this.renderArrowNext,
        showThumbs: false,
        showStatus: false,
        infiniteLoop: true,
        autoPlay: false,
        interval: 4000,
    });

    renderArrowPrev = (clickHandler: () => void, hasPrev: boolean, label: string) => {
        const arrowClasses = ['slider-control__prev', 'control-arrow'];

        return <button onClick={clickHandler} aria-label="prev slide / item"
                       className={arrowClasses.join(' ')}>
            <SliderPrev/>
        </button>;
    };

    renderArrowNext = (clickHandler: () => void, hasPrev: boolean, label: string) => {
        const arrowClasses = ['slider-control__next', 'control-arrow'];

        return <button onClick={clickHandler} aria-label="next slide / item"
                       className={arrowClasses.join(' ')}>
            <SliderNext/>
        </button>;
    };

    render() {
        const {mockProjects, popularCategories, principlesData} = this.props;
        return <>
            <Welcome mockProjects={mockProjects}
                     sliderProps={this.sliderProps}
            />
            <Popular popularCategories={popularCategories}/>
            <About/>
            <Principles principlesData={principlesData}/>
            <Feedback/>
        </>;
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        mockProjects: getProjects(state),
        popularCategories: getPopularCategories(state),
        principlesData: getPrinciplesData(state)
    }
}

export default compose(connect<StateProps, {}, {}, RootState>(mapStateToProps,
    {})
)(Index);
