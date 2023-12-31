// import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Roboto_Condensed } from "next/font/google";

import { useState } from "react";

import { api } from "~/utils/api";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300"],
});

export default function Home() {
  const [index, setIndex] = useState(Math.floor(Math.random() * 841));
  const [revealed, setRevealed] = useState(false);
  // setIndex(Math.floor(Math.random() * 849));
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const randomWord = api.post.getWord.useQuery(
    { index },
    { refetchOnWindowFocus: false },
  );

  // const word = generate({ minLength: 15 });

  return (
    <div className={roboto_condensed.className}>
      <Head>
        <title>Balderdash</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 pb-16 pt-10 ">
          <h1 className="text-5xl font-extrabold tracking-wide text-white sm:text-[5rem]">
            {randomWord.data?.word}
          </h1>
          <div className="flex flex-col items-center gap-2">
            {revealed ? (
              <p className="text-2xl text-white">
                {randomWord.data?.definition}
              </p>
            ) : (
              <button
                className="rounded-md border border-green-900 bg-green-600 p-2 text-2xl text-white"
                onClick={() => {
                  setRevealed(true);
                }}
              >
                Reveal Definition
              </button>
            )}

            {/* <AuthShowcase /> */}
          </div>
          <button
            className="rounded-lg border border-neutral-500 bg-neutral-500 p-3 text-3xl text-white"
            onClick={() => {
              setIndex(Math.floor(Math.random() * 841));
              setRevealed(false);
            }}
          >
            Next Word
          </button>
        </div>
      </main>
    </div>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
