import { GetServerSideProps } from "next";

const Home = () => null;

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  // With basePath, Next.js automatically handles the path prefix
  // So we can use a relative path or absolute path without basePath
  return {
    redirect: {
      destination: "/people",
      permanent: false
    }
  };
};

export default Home;

