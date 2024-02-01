import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPAge() {
    return (
        <>
            <div className="h-full bg-gradient-to-t from-gray-950 from-50% via-gray-900 via-30% to-gray-800 to-20%">
                <div>Landing Page</div>
                <div>
                    <Link href="/sign-in">
                        <Button>
                            Login
                        </Button>
                    </Link>
                    <Button>
                        <Link href="/sign-up">
                            Register
                        </Link>

                    </Button>

                </div>
            </div>

        </>

    );
}
