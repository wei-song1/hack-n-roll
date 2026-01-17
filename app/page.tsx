import Image from "next/image";
import Login from "./Login";
import Authenticator from "./Authenticator";

export default function Home() {
  return (
    <div className="min-h-screen flex">
    {/* Left side */}
        <div className="w-70/100 bg-gray-100 flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src="/banner.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                />
                
                <div className="absolute bottom-0 left-0 m-6">
                    <Authenticator />
                </div>
            </div>
        </div>

        {/* Right side */}
        <div className="w-30/100 bg-white flex items-center justify-center">
            <Login />
        </div>
    </div>
  );
}
