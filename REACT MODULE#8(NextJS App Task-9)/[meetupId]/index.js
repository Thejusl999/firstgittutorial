// '/[meetupId]' page
import { MongoClient } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function IndividualMeetup(props) {
  return (<>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta
        name="description"
        content={props.meetupData.description}  
      />
    </Head>
    <MeetupDetail {...props.meetupData}/>
  </>);
}

export async function getStaticPaths() {
  let paths=[];
  const client=await MongoClient.connect('mongodb+srv://tj999:tjtest@cluster0.9vuybed.mongodb.net/meetups?retryWrites=true&w=majority');
  const db=client.db();
  const meetupsCollection=db.collection('meetups');
  const meetups=await meetupsCollection.find().toArray();
  client.close();
  meetups.map(meetup=>{
    paths.push(
    {
      params: {
        meetupId: meetup._id.toString(),
      },
    })
  })
  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  let targetMeetup;
  const meetupId = context.params.meetupId; // Here we cant use useRouter because this function is outside the component function
  const client=await MongoClient.connect('mongodb+srv://tj999:tjtest@cluster0.9vuybed.mongodb.net/meetups?retryWrites=true&w=majority');
  const db=client.db();
  const meetupsCollection=db.collection('meetups');
  const meetups=await meetupsCollection.find().toArray();
  meetups.map(meetup=>{
    if(meetupId===meetup._id.toString()){
      targetMeetup={
        id:meetup._id.toString(),
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        description:meetup.description
      }
    }
  })
  client.close();
  
  return {
    props: {
      meetupData: targetMeetup,
    },
    revalidate: 1,
  };
}
export default IndividualMeetup;
