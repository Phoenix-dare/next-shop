import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  const { data: session, status } = useSession();
  console.log(session, status);
  if (session) {
    return (
      <div className="relative flex flex-col dark:text-white">
        <div className="flex justify-evenly flex-wrap flex-col">
          Signed in as
          {session.user.name && (
            <div className="flex justify-evenly flex-wrap flex-row">
              <Image
                src={session.user.image as string}
                alt="profile_pic"
                width={25}
                height={25}
                className="rounded-3xl"
              />
            </div>
          )}
          <span>
            {session.user.username ?? session.user?.name} <br />
          </span>
        </div>

        <button
          className="bg-blue-500  h-min py-1 rounded-md text-white  text-sm font-medium"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="relative flex flex-col h-min justify-items-center">
      <Link
        href="/register"
        className="bg-blue-500 px-4 py-2 rounded-md text-white font-medium m-1"
      >
        Register
      </Link>
      <button
        className="bg-blue-500 p-2 rounded-md text-white font-medium m-1 "
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
