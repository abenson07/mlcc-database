import { GetServerSideProps } from "next";

const Home = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/people",
    permanent: false
  }
});

export default Home;

