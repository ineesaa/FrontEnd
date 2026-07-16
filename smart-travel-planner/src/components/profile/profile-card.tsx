import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

interface ProfileCardProps {
  name: string | null;
  email: string;
  country: string | null;
  bio: string | null;
  image: string | null;
}

export function ProfileCard({
  name,
  email,
  country,
  bio,
  image,
}: ProfileCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-start">
        <Avatar src={image} name={name} email={email} size="xl" />
        <div className="flex-1 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-medium tracking-tight">
              {name ?? "Unnamed traveler"}
            </h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Country
              </dt>
              <dd className="mt-1 text-sm">{country ?? "Not set"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Bio
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground">
                {bio ?? "No bio yet — tell other travelers a bit about yourself."}
              </dd>
            </div>
          </dl>

          <div className="flex gap-3">
            <Button asChild size="sm" variant="secondary">
              <Link href="/profile/edit">Edit profile</Link>
            </Button>
            <SignOutButton size="sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
