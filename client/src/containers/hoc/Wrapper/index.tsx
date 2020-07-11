import React, {ReactNode} from "react";

import classes from "./Wrapper.module.scss";

interface Props {
    children: ReactNode
}

const Wrapper = (props: Props) => {
    return <div className={classes['wrapper']}>{props.children}</div>;
}

export default Wrapper;