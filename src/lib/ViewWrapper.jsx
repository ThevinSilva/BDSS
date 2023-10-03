import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';



function ViewWrapper(props){
    const { ref, inView, _ } = useInView({
        threshold: 0.5,
      });

    useEffect( () => {
        inView && props.setActive(props.id)
    },[inView]);

    return (
    <div id={props.id} ref={ref}>
        {props.children}
    </div>)
}

export default ViewWrapper;
