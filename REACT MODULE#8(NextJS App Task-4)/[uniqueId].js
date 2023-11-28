// our-domain.com/aboutus   -   ('/aboutus/uniqueId' page)
import { useRouter } from "next/router";

function DetailPage() {
  const router = useRouter();
  let value="Developer doesn't exist";

  const details = [
    { id: 1, name: "Yash", role: "Senior Developer"},
    { id: 2, name: "Vaibhav", role: "Backend Developer"},
    { id: 3, name: "Suresh", role: "Frontend Developer"},
  ];

  if (router.query.uniqueId==='1'){
    value=`${details[0].name} ${details[0].role}`;
  }else if(router.query.uniqueId==='2'){
    value=`${details[1].name} ${details[1].role}`;
  }else if(router.query.uniqueId==='3'){
    value=`${details[2].name} ${details[2].role}`;
  }

  return <h1>{value}</h1>;
}
export default DetailPage;
