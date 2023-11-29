// '/' page
// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

/* const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Taj_Mahal_Sunset_Edit1.jpg/330px-Taj_Mahal_Sunset_Edit1.jpg",
    address: "The Taj Mahal",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1920px-The_Golden_Temple_of_Amrithsar_7.jpg",
    address: "The Amrithsar Golden Temple",
    description: "This is a second meetup!",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Statue_of_Unity.jpg/375px-Statue_of_Unity.jpg",
    address: "The Statue of Unity",
    description: "This is a third meetup!",
  },
]; */
function HomePage(props) {
  // 1) with states
  /* const [loadedMeetups,setLoadedMeetups]=useState([]);
    useEffect(()=>{
        setLoadedMeetups(DUMMY_MEETUPS);
    },[]);
    return <MeetupList meetups={loadedMeetups}/>*/

  // 2) after implementing getStaticProps()
  return <MeetupList meetups={props.meetups} />;
}

/* export async function getServerSideProps(context){
    const request=context.req;
    const response=context.res;
    // fetch data from an API
    return {
        props:{
            meetups:DUMMY_MEETUPS
        }
    };
} */

export async function getStaticProps() {
  // fetch data from an API
  const client=await MongoClient.connect('mongodb+srv://tj999:tjtest@cluster0.9vuybed.mongodb.net/meetups?retryWrites=true&w=majority');
  const db=client.db();
  const meetupsCollection=db.collection('meetups');
  const meetups=await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString()
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
