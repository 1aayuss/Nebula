import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPAge() {
    return (
        <>
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
        </>

    );
}
