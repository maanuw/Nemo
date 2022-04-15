import Carousel from "react-multi-carousel";
import {React, useEffect, useState} from 'react';
import TreatmentCard from "./TreatmentCard";
import AddTreatment from "./AddTreatmentCard";

import "react-multi-carousel/lib/styles.css";

function TreatmentsCarousel({data}){
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }
    const [treatments, setTreatments] = useState([]);

    async function getTreatments() {
        try {
            const response = await fetch("http://localhost:3001/dashboard/treatments", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setTreatments(parseRes);
    
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTreatments()
    }, [])

    if(data === "admin"){
        return (
            <>
            <Carousel
                arrows={true}
                swipeable={false}
                draggable={false}
                showDots={false}
                renderDotsOutside={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-60-px"
                shouldResetAutoplay={true}
                centerMode={true}
            >
                {treatments.map((item, index) => {
                    return (
                        <div key={index}>
                            <TreatmentCard data={item} />
                        </div>
                    )
                })}
                <AddTreatment data={data}/> 
                
                
            </Carousel >
        </>
        )
    }else if (data === "patient"){
        return (
            <>
                <Carousel
                    arrows={true}
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    renderDotsOutside={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={1000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    shouldResetAutoplay={true}
                    centerMode={true}
                >
                    {treatments.map((item, index) => {
                        return (
                            <div key={index}>
                                <TreatmentCard data={item} />
                            </div>
                        )
                    })}
                    
                    
                </Carousel >
            </>
        )
    }
    return (
        <></>
    )

}

export default TreatmentsCarousel;