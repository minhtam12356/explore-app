import React from "react";
import TopBar from "components/layout/TopBar";
import { useRouter } from 'next/router';

function HomePage(): any {
  const router = useRouter();
  
  const onClickExplore = () => {
    router.push('/explore')
  }
  return (
    <div className="home">
      <TopBar content='Get started' isGetStarted/>
      <div className="home--title">Home to the world's best web3 builders.</div>
      <div className="home--content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
      <div className="home--explore-course" onClick={onClickExplore}>
        <div className="home--explore-course__text">Explore course</div>
      </div>
    </div>
  )
}

export default HomePage