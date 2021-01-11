import React from 'react'
import { useHistory } from 'react-router-dom'
import { Result, Button  } from "antd";

const PageFavVideos = () => {
    let history = useHistory();
    const onMoveBack = () =>{
        history.goBack()
    }

    return (
        <Result
        status='info'
        title='Favourite Video list'
        subTitle='There is item in the list at moment.'
        extra = {
            <Button type='primary' onClick={onMoveBack}>Go Back</Button>
        }
        />
    )
}

export default PageFavVideos
