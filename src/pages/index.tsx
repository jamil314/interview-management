import Head from "next/head";
import LoginForm from "@/component/Forms/LoginForm";
import Header from "@/component/margins/Header";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Footer from "@/component/margins/Footer";
import margin from "../styles/margins.module.scss";
import InterviewerMenu from "@/component/interviewer/InterviewerMenu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Interview Managemnt</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginForm />
    </>
  );
}
