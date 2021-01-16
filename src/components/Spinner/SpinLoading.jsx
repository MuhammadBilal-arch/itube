import React , { useState , useEffect} from 'react'
import { Spin } from 'antd'
export const SpinLoading = (props) => {
    const [spinner, setspin] = useState(true);

    useEffect(() => {
      let isActive = true;
      console.log("Spin Component Mount");  
      let time = setTimeout(() => {
        if(isActive)
        {
            setspin(false);
        }
      }, 7000);
  
      return () => {
        isActive = false;
        clearTimeout(time)
        console.log("Spin Component Unmount");
      };
    }, []);

    return (
        <Spin spinning={spinner} size="large">{props.children}</Spin>
    )
}

