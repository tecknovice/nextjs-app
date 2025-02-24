import Logo from '@/components/ui/logo';
import SigninForm from '@/components/signin-form';
import { Suspense } from 'react';
import Link from 'next/link';
 
export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <Suspense>
          <SigninForm />
        </Suspense>
        <div className="flex h-8 items-end space-x-1 text-xs font-medium text-gray-500 underline">
          <Link href={'/signup'}>Sign up</Link>
        </div>
      </div>
    </main>
  );
}