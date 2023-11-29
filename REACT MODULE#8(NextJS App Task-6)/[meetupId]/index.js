// '/[meetupId]' page
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function IndividualMeetup() {
  const router = useRouter();
  let meetup;
  const DUMMY_MEETUPS = [
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
  ];
  if (router.query.meetupId === "m1") {
    meetup = DUMMY_MEETUPS[0];
  } else if (router.query.meetupId === "m2") {
    meetup = DUMMY_MEETUPS[1];
  } else if (router.query.meetupId === "m3") {
    meetup = DUMMY_MEETUPS[2];
  }

  return <MeetupDetail {...meetup} />;
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      {
        params: {
          meetupId: "m3",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId; // Here we cant use useRouter because this function is outside the component function
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: meetupId,
        title: "A First Meetup",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Taj_Mahal_Sunset_Edit1.jpg/330px-Taj_Mahal_Sunset_Edit1.jpg",
        address: "The Taj Mahal",
        description: "This is a first meetup!",
      },
    },
  };
}
export default IndividualMeetup;
